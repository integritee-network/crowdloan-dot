# Tools for Reward Calculations

A few helpers to fetch contributions and calculate rewards. First of all, we need the raw list of individual contributions to our crowdloan campaigns.

## fetch crowdloan contributions

Only repeat this if there are new contributions. the result of ended campaigns is added to this repository for convenience, so you don't need to run it again unless for verification.
Integritee has been running the following fund id's: 40

```
./fetch-contributions.py <fund index> <subscan api key>
```

## Winning Crowdloan Rewards

Note: you need python 3.9
For our winning Polkadot crowdloan with fund id 40, you can reproduce allocations with:

```
./reward_calculation.py 40
```

For privacy reasons, we do not disclose the referral data. So you'll have to supply an empty file with

```
touch referrals-2039-40-bn.csv
```

