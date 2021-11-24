# crowdloan tools

A few helpers to fetch contributions and calculate rewards

# fetch crowdloan contributions

Only repeat this if there are new contributions. the result of ended campaigns is added to this repository for convenience.
Integritee has been running the following funds: 24, 38

```
./fetch-contributions.py <fund index> <subscan api key>
```

# guaranteed rewards

To calculate all guaranteed rewards for all contributors for both crowdloan campaigns so far, run
```
./guaranteed_reward_calculation.py 24
./guaranteed_reward_calculation.py 38
```

# lottery rewards

To calculate who qualifies for the time-slot based lottery draw, run the following script against a recent contributions dump csv

```
./lottery_filter_contributions.py
``` 
