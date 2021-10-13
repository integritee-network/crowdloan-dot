import requests
import csv

with open('contributions.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')

    page = 0
    while True:
        response = requests.post('https://kusama.api.subscan.io/api/scan/parachain/contributes',
                         headers={
                            'Content-Type': 'application/json',
                            'X-API-Key': 'f61b3cd451cee62383692c528215d12c',
                            'Accept': 'application/json',
                         },
                         json={
                            'row': 100,
                            'page': page,
                            'from_history': True,
                            'fund_id': "2015-24"
                         }
        )
        contributions = response.json().get('data').get('contributes')
        if contributions is None:
            break
        if page == 0:
            print(contributions)

        for contribution in contributions:
            print(contribution.get('who') + ', ' + str(contribution.get('contributing')) + ", " + str(contribution.get('block_num')))
            writer.writerow([contribution.get('who'), str(contribution.get('contributing')), str(contribution.get('block_num')), str(contribution.get('block_timestamp'))])

        page += 1
