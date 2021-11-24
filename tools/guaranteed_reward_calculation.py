#!/usr/bin/env python3.9
import csv
import sys

if len(sys.argv) < 2:
    print("Usage: ./guaranteed_rewards_calculation.py <fund index>")
    sys.exit()

fund_id = sys.argv[1]
if fund_id == '24':
    blocknumber_crowdloan_end = 9_676_800
    total_rewards = 20_000  # TEER
elif fund_id == '38':
    blocknumber_crowdloan_end = 10_281_600
    total_rewards = 20_000  # TEER
else:
    raise(BaseException(f'unknown fund-id: {fund_id}'))

# Settings:

input_file = f'contributions-2015-{fund_id}.csv'
output_file = f'guaranteed-rewards-2015-{fund_id}.csv'

waived_accounts = ["EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB",
                    "G7Lwgm7GxrH2V6BREqSdi9EtKAD9DLmREiPW9YnkmpuxDwW",
                    "E5rK9r9LEa5JPr1iabNaGSMy8GHu1MX2ShnPYSbKLA37xEH",
                    "EijCociWDFh6ZBKY3P6KnvujkmcttiNVrTLS8WvcQ7KDHRx"]

def get_total_cointime(address: str = None) -> int:
    """
    calculates the total cointime for a given address.
    The data is read out from a csv set by global variable "input_file"
    cointime = contribution times number of blocks until end of crowdloan

    :param address: account address. If None calculate for all addresses.
    :return: total cointime
    """
    tot = 0
    with open(input_file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if address is not None and address != row[0]:
                continue
            if row[0] in waived_accounts:
                continue
            contribution = int(row[1])
            block_number = int(row[2])
            tot += contribution * (blocknumber_crowdloan_end - block_number)
    return tot


def read_addresses_from_file() -> dict[str, int]:
    addresses = {}
    with open(input_file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            a = row[0]
            if a not in addresses.keys():
                addresses[a] = get_total_cointime(a)
    return addresses


def get_guaranteed_reward(personal_cointime: int, overall_total: int) -> float:
    return total_rewards * personal_cointime / overall_total


def test_total_cointime_consistency(addresses: dict[str, int]):
    """
    the sum of the cointimes for all unique addresses should be equal to the total cointime

    :param addresses:
    """
    total = sum(addresses.values())
    assert total == get_total_cointime()


def calculate_all_rewards(addresses: dict[str, int]):
    """
    writes all rewards into the output file set by global variable

    :param addresses:
    """
    overall_total_cointime = sum(addresses.values())
    with open(output_file, "w", newline='') as output:
        writer = csv.writer(output)
        for a, c in addresses.items():
            writer.writerow([a, get_guaranteed_reward(c, overall_total_cointime)])


def get_total_reward() -> float:
    """
    to check the calculated rewards, sum up all results in the output file

    :return: sum of all rewards
    """
    s = 0
    with open(output_file, newline='') as output:
        reader = csv.reader(output)
        for row in reader:
            s += float(row[1])
    return s


if __name__ == "__main__":
    # calculate reward for all addresses
    print("read in all addresses ... ")
    address_dict = read_addresses_from_file()
    print("test data consistency ... ")
    test_total_cointime_consistency(address_dict)
    print("calculating rewards ... ")
    calculate_all_rewards(address_dict)
    print(f"total rewards given: {get_total_reward()}")
