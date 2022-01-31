#!/usr/bin/env python3.9
import csv
import sys
from datetime import datetime
import pytz

if len(sys.argv) < 2:
    print("Usage: ./reward_calculation.py <fund index>")
    sys.exit()

fund_id = sys.argv[1]
if fund_id == '24':
    blocknumber_crowdloan_end = 9_676_800
    pot_guaranteed_rewards = 21460.2955281453 # TEER (correction after missing some contributions)
    winning = False
elif fund_id == '38':
    blocknumber_crowdloan_end = 10_281_600
    pot_guaranteed_rewards = 20_000  # TEER
    winning = False
elif fund_id == '56':
    blocknumber_crowdloan_end = 10_786_200
    pot_guaranteed_rewards = 0  # TEER (didn't reach threshold)
    winning = False
elif fund_id == '59':
    blocknumber_crowdloan_end = 11_391_600
    pot_guaranteed_rewards = 20_000  # TEER
    base_reward_per_ksm = 40  # TEER
    early_reward_factor = 0.2
    early_reward_endtime = datetime.fromisoformat("2022-01-07 08:00+00:00")  # GMT
    winning = True
elif fund_id == '0':
    blocknumber_crowdloan_end = 200
    pot_guaranteed_rewards = 20_000  # TEER
    base_reward_per_ksm = 40  # TEER
    early_reward_factor = 0.2
    early_reward_endtime = datetime.fromisoformat("2022-01-07 08:00+00:00")  # GMT
    winning = True
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


def to_ksm(picoksm: int) -> float:
    return picoksm * pow(10, -12)


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
            c = Contribution(float(row[1]), int(row[2]), datetime.fromtimestamp(float(row[3]), pytz.utc))
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


def get_early_contributions(address: str) -> int:
    global contributors
    tot = 0
    if address in waived_accounts:
        return 0
    contributions = contributors[address]
    for c in contributions:
        if c.timestamp < early_reward_endtime:
            tot += c.amount
    return tot


def calculate_all_rewards():
    """
    writes all rewards into the output file set by global variable

    """
    global contributors, output_file
    overall_total_cointime = get_total_cointime()

    total_rewards = {
        'base': 0,
        'early': 0,
        'guaranteed': 0
    }
    with open(output_file, "w", newline='') as output:
        writer = csv.writer(output)
        for a in contributors.keys():
            if a in waived_accounts:
                continue

            contributions = contributors[a]
            # base reward
            reward_base = base_reward_per_ksm * to_ksm(sum(c.amount for c in contributions))
            total_rewards['base'] += reward_base

            # early bonus
            reward_early = base_reward_per_ksm * early_reward_factor * to_ksm(get_early_contributions(a))
            total_rewards['early'] += reward_early

            # guaranteed reward
            reward_guaranteed = pot_guaranteed_rewards * get_total_cointime(a) / overall_total_cointime
            reward_guaranteed = max(existential_deposit, reward_guaranteed)
            total_rewards['guaranteed'] += reward_guaranteed

            writer.writerow([a, reward_base, reward_early, reward_guaranteed])
    print(f"total rewards: {total_rewards}")


if __name__ == "__main__":
    # calculate reward for all addresses
    print("read in all addresses ... ")
    read_contributions_from_file()
    print(f"read contributions from {len(contributors.keys())} contributors")
    print("calculating rewards ... ")
    calculate_all_rewards()

