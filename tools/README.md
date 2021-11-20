# crowdloan tools

A few helpers to fetch contributions and calculate rewards

# fetch crowdloan contributions

Only repeat this if there are new contributions. the result is added to this repository for convenience.
Integritee has been running the following funds: 24, 38

```
/fetch_contributions.py <fund index> <subscan api key>
```

# lottery rewards

To calculate who qualifies for the time-slot based lottery draw, run the following script against a recent contributions dump csv

```
./lottery_filter_contributions.py
``` 
