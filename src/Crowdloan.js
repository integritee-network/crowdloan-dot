import React from 'react';
class Crowdloan extends React.Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      depositor: null,
      verifier: null,
      deposit: null,
      raised: null,
      end: null,
      cap: null,
      lastContribution: { ending: null },
      firstPeriod: null,
      lastPeriod: null,
      trieIndex: null
    };
  }

  async componentDidMount () {
    this.getItems();
  }

  kMFormatter (num) {
    const decimals = api.registry.chainDecimals;
    const numAfterDecimalReduction = Math.abs(num) / (Math.pow(10, decimals));
    if (Math.abs(numAfterDecimalReduction) > 999 && Math.abs(numAfterDecimalReduction) < 999999) {
      return Math.sign(numAfterDecimalReduction) * ((Math.abs(numAfterDecimalReduction) / 1000).toFixed(1)) + ' k';
    } else if (Math.abs(numAfterDecimalReduction) > 999999) {
      return Math.sign(numAfterDecimalReduction) * ((Math.abs(numAfterDecimalReduction) / 1000000).toFixed(1)) + ' M';
    } else {
      return Math.sign(num) * Math.abs(num);
    }
  }

  async getItems () {
    const queryResHandler = result => {
      const data = JSON.parse(result);
      this.setState({
        depositor: data.depositor,
        verifier: data.verifier,
        deposit: data.deposit,
        raised: data.raised,
        end: data.end,
        cap: data.cap,
        lastContribution: data.lastContribution,
        firstPeriod: data.firstPeriod,
        lastPeriod: data.lastPeriod,
        triePeriod: data.triePeriod,
        loading: false
      });
    };
    const transformed = ['2004'];
    const palletRpc = 'crowdloan';
    const callable = 'funds';
    await api.query[palletRpc][callable](...transformed, queryResHandler);
  }

  render () {
    return (
            <div>
                <h1>Crowdloan Funds</h1>
                {this.state.loading || !this.state.depositor
                  ? (
                    <div>loading...</div>
                    )
                  : (
                    <div>
                        <div>raised: {this.kMFormatter(parseInt(this.state.raised, 16))}KSM</div>
                        <div>end: {this.state.end}</div>
                        <div>cap: {this.kMFormatter(parseInt(this.state.cap, 16))}KSM</div>
                        <div>last_contribution.ending: {this.state.lastContribution.ending}</div>
                        <div>first_period: {this.state.firstPeriod}</div>
                        <div>last_period: {this.state.lastPeriod}</div>
                    </div>
                    )}
            </div >
    );
  }
}

export default Crowdloan;
