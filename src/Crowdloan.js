import React from 'react';
import ReactDom from 'react-dom'

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
        // const query = async () => {
        //     const unsub = await api.query[palletRpc][callable](...transformed, queryResHandler);
        //     setUnsub(() => unsub);
        // };

    }

    kMFormatter(num) {
        if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
            let result = Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + ' k';
            return result;
        }
        else if (Math.abs(num) > 999999) {
            let result = Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + ' M';
            console.log(result)
            return result;
        }
        else {
            return Math.sign(num) * Math.abs(num)
        }
    }

    async getItems() {
        const queryResHandler = result => {
            console.log('Response from main API: ', result.toString());
            let data = JSON.parse(result);
            // setData({ depositor: resultdata.depositor, raised: resultJson.raised })
            // console.log(result.toString());
            // const data = result.json()
            this.setState({
                depositor: data.depositor, verifier: data.verifier, deposit: data.deposit, raised: data.raised, end: data.end, cap: data.cap,
                lastContribution: data.lastContribution, firstPeriod: data.firstPeriod, lastPeriod: data.lastPeriod, triePeriod: data.triePeriod, loading: false
            })
            // re;sult.isNone ? setStatus('None') : setStatus(result);
        }
        let transformed = ['2004'];
        let palletRpc = 'crowdloan';
        let callable = 'funds';
        const response = await api.query[palletRpc][callable](...transformed, queryResHandler);
        let url = 'https://api.randomuser.me/';
        // const response = await fetch(url);
        // .then(results => results.json())
        // .then(results => this.setState({ 'items': results }));
        // const data = await response.json()
        // this.setState({ person: data.results[0], loading: false })
        // console.log(data.results[0])
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