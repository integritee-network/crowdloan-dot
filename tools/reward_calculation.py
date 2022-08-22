#!/usr/bin/env python3.9
import csv
import sys
from datetime import datetime
from dateutil.parser import isoparse
import pytz

if len(sys.argv) < 2:
    print("Usage: ./reward_calculation.py <fund index>")
    sys.exit()

fund_id = sys.argv[1]
if fund_id == '40':
    blocknumber_crowdloan_end = 12_094_000
    pot_guaranteed_rewards = 0  # TEER
    base_reward_per_dot = 2.5  # TEER
    early_reward_factor = 0.2
    early_reward_endtime = datetime.fromisoformat("2022-07-14 08:00+00:00")  # GMT
    referral_reward_factor = 0.05
    loyalty_ids = [59] # This should be kusama
    loyalty_reward_factor = 0.15
    winning = True
else:
    raise(BaseException(f'unknown fund-id: {fund_id}'))

# Settings:

input_file = f'contributions-2039-{fund_id}.csv'
referral_file = f'referrals-2039-{fund_id}-bn.csv'
output_file = f'rewards-2039-{fund_id}.csv'

waived_accounts = ["EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB",
                    "G7Lwgm7GxrH2V6BREqSdi9EtKAD9DLmREiPW9YnkmpuxDwW",
                    "E5rK9r9LEa5JPr1iabNaGSMy8GHu1MX2ShnPYSbKLA37xEH",
                    "EijCociWDFh6ZBKY3P6KnvujkmcttiNVrTLS8WvcQ7KDHRx",
                    "14AMZ3gw4tRsrdp78i4MmHZ8EFbXTMfuXGQMEC3t1GoqLboH" # Bifrost
                    ]

existential_deposit = 0.001  # 1mTEER

global contributors, previous_contributions_max

referrals = {}


def to_dot(picodot: int) -> float:
    return picodot * pow(10, -10)


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


def read_contributions_from_file(file: str) -> {}:
    lcontributors = {}
    total_dot = 0
    count_contributions = 0
    with open(file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            a = row[0]
            try:
                c = Contribution(to_dot(float(row[1])), int(row[2]), datetime.fromtimestamp(float(row[3]), pytz.utc))
            except:
                # print("Timestamp is not unix, trying with isoparse")
                c = Contribution(to_dot(float(row[1])), int(row[2]), datetime.fromtimestamp(isoparse(row[3]).timestamp(), pytz.utc))  
                # print (isoparse(row[3]).timestamp())
            if a not in lcontributors.keys():
                lcontributors[a] = [c]
            else:
                lcontributors[a].append(c)
            total_dot += c.amount
            count_contributions += 1
    print(f'read {count_contributions} contributions from {len(lcontributors)} contributors, totalling {total_dot} DOT from {file}')
    return lcontributors


def read_referrals_from_file():
    """
    reads referrals and validates referrals topographically
    can't prevent referring someone who has previously contributed without having referred someone before.
    But that's fine as only contributions after the referral are counted
    """
    global referrals
    with open(referral_file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        referrers = {}

        # first line is column title
        _ = next(reader)

        for row in reader:
            referrer = row[0]
            referred = row[1]
            if referrer == referred:
                continue
            blocknumber = int(row[2])

            if referred not in referrals.keys():
                referrals[referred] = [(referrer, blocknumber)]
            else:
                referrals[referred].append((referrer, blocknumber))

            if referrer not in referrers.keys():
                referrers[referrer] = 1
            else:
                referrers[referrer] += 1
    print(f'read {sum(referrers.values())} unverified referrals. No. referrers {len(referrers)}.  No. referred accounts: {len(referrals)}')


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


def calculate_referral_dot() -> {str: float}:
    global contributors, referrals, referral_reward_factor
    referred_dot = {}
    referrer_dot = {}

    for a in contributors.keys():
        if a in referrals.keys():
            referred = a
            for c in contributors[referred]:
                for (referrer, blocknumber) in referrals[referred]:
                    if referrer in contributors.keys():
                        if c.blocknumber == blocknumber:
                            if not referrer in referrer_dot:
                                referrer_dot[referrer] = 0.0
                            referrer_dot[referrer] += c.amount
                            if not referred in referred_dot:
                                referred_dot[referred] = 0.0
                            referred_dot[referred] += c.amount
                    else:
                        print(f"ignoring {referred} was referred by {referrer} which hasn't contributed this time")


    print(f"checked {len(referrals)} referred accounts using a referral code, total contributions {sum(referred_dot.values())} DOT")
    top_referrer = max(referrer_dot, key= lambda x: referrer_dot[x])
    top_referred = max(referred_dot, key= lambda x: referred_dot[x])
    print(f"referrer accounts: {len(referrer_dot.keys())}. top referrer {top_referrer} with {referrer_dot[top_referrer]} DOT")
    print(f"referred accounts: {len(referred_dot.keys())}. top referred {top_referred} with {referred_dot[top_referred]} DOT")
    return {k: referrer_dot.get(k, 0) + referred_dot.get(k, 0) for k in set(referred_dot) | set(referrer_dot)}


def gather_previous_campaign_contributions() -> {str: float}:
    contributions = {}
    for fund_id in loyalty_ids:
        contribs = read_contributions_from_file(f'contributions-2039-{fund_id}.csv')
        for a, cs in contribs.items():
            total = sum(c.amount for c in cs)
            if a in contributions.keys():
                if contributions[a] < total:
                    contributions[a] = total
            else:
                contributions[a] = total
    return contributions


def calculate_all_rewards():
    """
    writes all rewards into the output file set by global variable

    """
    global contributors, output_file, previous_contributions_max, winning
    overall_total_cointime = get_total_cointime()

    total_rewards = {
        'base': 0.0,
        'early': 0.0,
        'referral': 0.0,
        'loyalty': 0.0,
        'guaranteed': 0.0
    }

    referral_dot = calculate_referral_dot()

    count_contributions = 0
    count_loyal_accounts = 0
    total_loyalty_dot = 0
    total_waived_dot = 0
    total_base_dot = 0

    with open(output_file, "w", newline='') as output:
        writer = csv.writer(output)
        writer.writerow(['# account', 'total', 'base', 'early', 'referral', 'loyalty', 'guaranteed'])
        for a in contributors.keys():
            contributions = contributors[a]
            count_contributions += len(contributions)
            sum_dot = sum(c.amount for c in contributions)
            if a in waived_accounts:
                print(f'ignoring waived account {a} amounting {sum_dot}')
                total_waived_dot += sum_dot
                continue

            # base reward
            total_base_dot += sum_dot
            #print(f'{a} has contributed {sum_dot} in total')

            if winning:
                reward_base = base_reward_per_dot * sum_dot
                total_rewards['base'] += reward_base

                # early bonus
                reward_early = base_reward_per_dot * early_reward_factor * get_early_contributions(a)
                total_rewards['early'] += reward_early

                # referral bonus
                if a in referral_dot.keys():
                    reward_referral = base_reward_per_dot * referral_reward_factor * referral_dot[a]
                    total_rewards['referral'] += reward_referral
                else:
                    reward_referral = 0

                # loyalty reward
                if a in previous_contributions_max.keys():
                    print(f'{a} has previously contributed {previous_contributions_max[a]} KSM \t this time: {sum_dot} DOT')
                    # reward_loyalty = min(sum_dot, previous_contributions_max[a]) * loyalty_reward_factor * base_reward_per_dot
                    count_loyal_accounts += 1
                    # total_loyalty_dot += min(sum_dot, previous_contributions_max[a])
                    reward_loyalty = sum_dot * loyalty_reward_factor
                    total_loyalty_dot += reward_loyalty
                else:
                    reward_loyalty = 0
                total_rewards['loyalty'] += reward_loyalty

                total = reward_base + reward_early + reward_referral + reward_loyalty
                writer.writerow([a, total, reward_base, reward_early, reward_referral, reward_loyalty, 0])
            else:
                # guaranteed reward
                reward_guaranteed = pot_guaranteed_rewards * get_total_cointime(a) / overall_total_cointime
                reward_guaranteed = max(existential_deposit, reward_guaranteed)
                total_rewards['guaranteed'] += reward_guaranteed

                # non-winning campaign
                writer.writerow([a, reward_guaranteed, 0, 0, 0, 0, reward_guaranteed])

    print(f'considered {count_contributions} contributions, amounting {total_base_dot} DOT')
    print(f'total waived contributions: {total_waived_dot} DOT')
    print(f'number of loyal accounts {count_loyal_accounts}/{len(contributors)}. Repeating contribution total: {total_loyalty_dot} DOT')
    print(f"total rewards by type [TEER]: {total_rewards}")
    print(f"total rewards payout: {sum(total_rewards.values())} TEER")


if __name__ == "__main__":
    global contributors, previous_contributions_max
    # calculate reward for all addresses
    print("read in all contributors ... ")
    contributors = read_contributions_from_file(input_file)

    if winning:
        print("read in all referrals ... ")
        read_referrals_from_file()

        print("gather loyalty behaviour")
        previous_contributions_max = gather_previous_campaign_contributions()

    print("calculating rewards ... ")
    calculate_all_rewards()

