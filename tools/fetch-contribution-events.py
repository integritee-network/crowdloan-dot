#!/usr/bin/env python3
#
# ./fetch_contribution_events <fund index> <subscan api key>
#
import requests
import csv
import sys
import json
import time
from substrateinterface.utils.ss58 import ss58_decode, ss58_encode

if len(sys.argv) < 3:
    print("Usage: ./fetch_contributions.py <fund index> <subscan api key>")
    sys.exit()

fund_id = sys.argv[1]
api_key = sys.argv[2]

page_rows = 100

if fund_id == '24':
    start_block = 8960721 # (2021-08-25 23:20)
    end_block = 9676800 #(2021-10-15 20:38)
elif fund_id == '38':
    start_block =  9754256 #(2021-10-21 08:45)
    end_block =  10281600 #(2021-11-27 20:10)
else:
    raise(BaseException(f'unknown fund-id: {fund_id}'))

# fetch global fund data first
response = requests.post('https://polkadot.api.subscan.io/api/scan/parachain/funds',
                         headers={
                             'Content-Type': 'application/json',
                             'X-API-Key': api_key,
                             'Accept': 'application/json',
                         },
                         json={
                             'row': page_rows,
                             'page': 0,
                             'fund_id': f'2015-{fund_id}'
                         }
                         )

raised = int(response.json()['data']['funds'][0]['raised'])

t_start = time.time()
blocks_total = end_block - start_block

with open(f'contribution-events-2015-{fund_id}.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    total_contributed = 0
    for block in range(start_block, end_block):
        page = 0
        while True:
            response = requests.post('https://polkadot.api.subscan.io/api/scan/events',
                                     headers={
                                         'Content-Type': 'application/json',
                                         'X-API-Key': api_key,
                                         'Accept': 'application/json',
                                     },
                                     json={
                                         'row': 100,
                                         'page': page,
                                         'module': 'crowdloan',
                                         'block_num': block
                                     }
                                     )

            try:
                events = response.json()['data']['events']
            except:
                print(response)
                try:
                    print(response.json())
                except:
                    print("error decoding response")
                print("sleeping a bit")
                time.sleep(0.9)
                continue
            remaining = int(response.headers['X-RateLimit-Remaining-Second'])
            if remaining < 1:
                print(f"approaching rate limit {remaining}/{response.headers['X-RateLimit-Limit-Second']}")

            if events is None:
                break


            progress = float(block - start_block + 1) / blocks_total
            t_elapsed = time.time() - t_start
            t_togo = t_elapsed / progress
            print(f"scanning block {block} ({progress*100}%) page : {page} - nr of events: {len(events)}, eta {t_togo/3600}h")

            for event in events:
                if event['event_id'] == 'Contributed':
                    params = json.loads(event['params'])
                    if params[1]['value'] == 2015:
                        who = ss58_encode(params[0]['value'], ss58_format=2)
                        contributed = params[2]['value']
                        print(f"this is for 2015. {who} contributed {contributed}")
                        total_contributed += int(contributed)
                        writer.writerow([who,
                                         str(contributed),
                                         str(block),
                                         ])
                        csvfile.flush()

            if len(events) < page_rows:
                break
            page += 1

print(f"total contributed: {total_contributed}")

if total_contributed == raised:
    print("SUCCESS: sum of contributions equals raised amount")
else:
    print(f"ERROR: sum of contributions = {total_contributed} not equal to raised amount of {raised}")

