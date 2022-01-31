#!/usr/bin/env python3.9
import csv
import sys
from datetime import datetime

if len(sys.argv) < 2:
    print("Usage: ./reward_calculation.py <fund index>")
    sys.exit()

fund_id = sys.argv[1]
if fund_id == '24':
    blocknumber_crowdloan_end = 9_676_800
    pot_guaranteed_rewards = 21460.2955281453 # TEER (correction after missing some contributions)
elif fund_id == '38':
    blocknumber_crowdloan_end = 10_281_600
    pot_guaranteed_rewards = 20_000  # TEER
elif fund_id == '56':
    blocknumber_crowdloan_end = 10_786_200
    pot_guaranteed_rewards = 0  # TEER (didn't reach threshold)
elif fund_id == '59':
    blocknumber_crowdloan_end = 11_391_600
    pot_guaranteed_rewards = 20_000  # TEER
elif fund_id == '0':
    blocknumber_crowdloan_end = 200
    pot_guaranteed_rewards = 20_000  # TEER
else:
    raise(BaseException(f'unknown fund-id: {fund_id}'))

# Settings:

input_file = f'contributions-2015-{fund_id}.csv'
output_file = f'rewards-2015-{fund_id}.csv'

waived_accounts = ["EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB",
                    "G7Lwgm7GxrH2V6BREqSdi9EtKAD9DLmREiPW9YnkmpuxDwW",
                    "E5rK9r9LEa5JPr1iabNaGSMy8GHu1MX2ShnPYSbKLA37xEH",
                    "EijCociWDFh6ZBKY3P6KnvujkmcttiNVrTLS8WvcQ7KDHRx"]

existential_deposit = 0.001  # 1mTEER

contributors = {}


class Contribution:
    """A single crowdloan contribution

    amount: [TEER]
    """
    def __init__(self, amount: float, blocknumber: int, timestamp: datetime):
        self.amount = amount
        self.blocknumber = blocknumber
        self.timestamp = timestamp

    def cointime(self) -> float:
        global blocknumber_crowdloan_end
        return self.amount * (blocknumber_crowdloan_end - self.blocknumber)


def read_contributions_from_file():
    global contributors
    with open(input_file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            a = row[0]
            c = Contribution(float(row[1]), int(row[2]), datetime.fromtimestamp(float(row[3])))
            if a not in contributors.keys():
                contributors[a] = [c]
            else:
                contributors[a].append(c)


def get_total_cointime(address: str = None) -> int:
    """
    calculates the total cointime for a given or all addresss.
    cointime = contribution times number of blocks until end of crowdloan

    :param address: account address. If None calculate for all addresses.
    :return: total cointime
    """
    global contributors

    if address is None:
        addresses = contributors.keys()
    else:
        if address in contributors.keys():
            addresses = [address]
        else:
            return 0

    tot = 0
    for a in addresses:
        if a in waived_accounts:
            continue
        contributions = contributors[a]
        for c in contributions:
            tot += c.cointime()
    return tot


def get_guaranteed_reward(personal_cointime: int, overall_total: int) -> float:
    return pot_guaranteed_rewards * personal_cointime / overall_total


def calculate_all_rewards():
    """
    writes all rewards into the output file set by global variable

    """
    global contributors, output_file
    overall_total_cointime = get_total_cointime()

    total_rewards = 0
    with open(output_file, "w", newline='') as output:
        writer = csv.writer(output)
        for a in contributors.keys():
            if a in waived_accounts:
                continue
            reward = pot_guaranteed_rewards * get_total_cointime(a) / overall_total_cointime
            reward = max(existential_deposit, reward)
            total_rewards += reward
            writer.writerow([a, reward])
    print(f"total rewards: guaranteed: {total_rewards}")


if __name__ == "__main__":
    # calculate reward for all addresses
    print("read in all addresses ... ")
    read_contributions_from_file()
    print(f"read contributions from {len(contributors.keys())} contributors")
    print("calculating rewards ... ")
    calculate_all_rewards()

