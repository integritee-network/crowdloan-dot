import requests
import csv
import sys

if len(sys.argv) < 2:
    print("Api Key required.")
    sys.exit()

api_key = sys.argv[1]

with open('contributions-2015-24.csv', 'w', newline='') as csvfile:
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
                                     'fund_id': "2015-24"
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
