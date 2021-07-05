import React from 'react';
class Crowdloan extends React.Component {
    constructor() {
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
            trieIndex: null,

            person: null,
            'items': []
        }
    }

    async componentDidMount() {
        this.getItems();
    }

    kMFormatter(num) {
        let decimals = api.registry.chainDecimals;
        let numAfterDecimalReduction = Math.abs(num) / (Math.pow(10, decimals));
        // let x = formatBalance(
        //     num,
        //     { withSi: false, forceUnit: '-' },
        //     chainDecimals
        // );
        // function toUnit(balance, decimals) {
        //     base = new BN(10).pow(new BN(decimals));
        //     dm = new BN(balance).divmod(base);
        //     return parseFloat(dm.div.toString() + "." + dm.mod.toString())
        // }
        // console.log("formatBalance: " + x);
        if (Math.abs(numAfterDecimalReduction) > 999 && Math.abs(numAfterDecimalReduction) < 999999) {
            return Math.sign(numAfterDecimalReduction) * ((Math.abs(numAfterDecimalReduction) / 1000).toFixed(1)) + ' k';
        }
        else if (Math.abs(numAfterDecimalReduction) > 999999) {
            return Math.sign(numAfterDecimalReduction) * ((Math.abs(numAfterDecimalReduction) / 1000000).toFixed(1)) + ' M';
            // console.log(result)
        }
        else {
            return Math.sign(num) * Math.abs(num)
        }
    }

    async getItems() {
        const queryResHandler = result => {
            // console.log('Response from main API: ', result.toString());
            let data = JSON.parse(result);
            this.setState({
                depositor: data.depositor, verifier: data.verifier, deposit: data.deposit, raised: data.raised, end: data.end, cap: data.cap,
                lastContribution: data.lastContribution, firstPeriod: data.firstPeriod, lastPeriod: data.lastPeriod, triePeriod: data.triePeriod, loading: false
            })
        }
        let transformed = ['2004'];
        let palletRpc = 'crowdloan';
        let callable = 'funds';
        const response = await api.query[palletRpc][callable](...transformed, queryResHandler);
        // let url = 'https://api.randomuser.me/';
    }
    render() {
        return (
            <div>
                <h1>Crowdloan Funds</h1>
                {this.state.loading || !this.state.depositor ? (
                    <div>loading...</div>
                ) : (
                    <div>
                        <div>depositor: {this.state.depositor}</div>
                        <div>verifier: {this.state.verifier}</div>
                        <div>deposit: {this.state.deposit}</div>
                        <div>raised: {this.kMFormatter(parseInt(this.state.raised, 16))}KSM</div>
                        <div>end: {this.state.end}</div>
                        <div>cap: {this.kMFormatter(parseInt(this.state.cap, 16))}KSM</div>
                        <div>last_contribution.ending: {this.state.lastContribution.ending}</div>
                        <div>first_period: {this.state.firstPeriod}</div>
                        <div>last_period: {this.state.lastPeriod}</div>
                        <div>trie_index: {this.state.trieIndex}</div>
                    </div>
                )}
            </div >
            //     < ul >
            // {
            //     this.state.items.map(function (item, index) {
            //         return <h1>{person}</h1>
            //     })
            // }
            //     </ul>
        );
    }
}

export default Crowdloan;