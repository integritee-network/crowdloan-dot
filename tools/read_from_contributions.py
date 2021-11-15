import csv
from datetime import datetime, timedelta
import pytz

input_file = "contributions-2015-38.csv"
output_file = "filtered-contributions.csv"
date = pytz.utc.localize(datetime(2021, 11, 12))
minimum_amount = 1.
print(f"date is {date}")

timestamp_start = date.timestamp()
print(f"timestamp start {timestamp_start}")

timestamp_stop = (date + timedelta(days=1)).timestamp()
print(f"timestamp stop {timestamp_stop}")

with open(input_file, newline='') as csvfile, open(output_file, "w", newline='') as outfile:
    reader = csv.reader(csvfile)
    writer = csv.writer(outfile)
    writer.writerow(["#account", "date", "contribution"])
    for row in reader:
        contribution = int(row[1])
        if contribution < minimum_amount * 10 ** 12:
            continue
        timestamp = int(row[3])
        if not timestamp_start < timestamp < timestamp_stop:
            continue
        writer.writerow([row[0], datetime.utcfromtimestamp(timestamp), contribution])
