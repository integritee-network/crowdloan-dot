#!/usr/bin/env python3
#
# ./fetch_contributions <fund index> <subscan api key>
#
import requests
import csv
import sys

if len(sys.argv) < 3:
    print("Usage: ./fetch_contributions.py <fund index> <subscan api key>")
    sys.exit()

fund_id = sys.argv[1]
api_key = sys.argv[2]

with open(f'contributions-2015-{fund_id}.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')

    page = 0
    while True:
        response = requests.post('https://kusama.api.subscan.io/api/scan/parachain/contributes',
                                 headers={
                                     'Content-Type': 'application/json',
                                     'X-API-Key': api_key,
                                     'Accept': 'application/json',
                                 },
                                 json={
                                     'row': 100,
                                     'page': page,
                                     'from_history': True,
                                     'fund_id': f'2015-{fund_id}'
                                 }
                                 )
        contributions = response.json()['data']['contributes']
        if contributions is None:
            break
        if page == 0:
            print(contributions)

        for contribution in contributions:
            print(f"{contribution['who']}, {str(contribution['contributing'])}, {str(contribution['block_num'])}")
            writer.writerow([contribution.get('who'),
                             str(contribution.get('contributing')),
                             str(contribution.get('block_num')),
                             str(contribution.get('block_timestamp'))])

        page += 1
