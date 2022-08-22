#!/usr/bin/env python3
#
# ./fetch_contributions <fund index> <subscan api key>
#
import requests
import csv
import sys

if len(sys.argv) < 3:
    print("Usage: ./convert-referral-blockhash-to-blocknum.py <referral-dump-file-basename> <subscan api key>")
    sys.exit()

input_file = sys.argv[1]
api_key = sys.argv[2]

with open(f'{input_file}.csv', 'r') as infile:
    reader = csv.reader(infile)
    with open(f'{input_file}-bn.csv', 'w', newline='') as outfile:
        writer = csv.writer(outfile, delimiter=',')
        for row in reader:
            if row[0][0] == '#':
                writer.writerow(row)
                continue
            block_hash = row[2]
            print(f'block hash {block_hash}')

            response = requests.post('https://polkadot.api.subscan.io/api/scan/block',
                                 headers={
                                     'Content-Type': 'application/json',
                                     'X-API-Key': api_key,
                                     'Accept': 'application/json',
                                 },
                                 json={
                                     'block_hash': block_hash,
                                 }
                                 )
            #print(f'response {response}')
            block_num = response.json()['data']['block_num']
            print(f'block hash {block_hash} is block number {block_num}')

            row[2] = str(block_num)
            writer.writerow(row)
