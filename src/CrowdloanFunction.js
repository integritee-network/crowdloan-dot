import React, { useState } from 'react';
import { useSubstrate } from './substrate-lib';
// var flatten = require('flat')

export default function Main (props) {
    const { api } = useSubstrate();
    const [loading, setLoading] = useState(true);

    const queryResHandler = result => {
        const humanData = result.toHuman();
        const y = result.toJSON();
        setAllValues(allValues = (humanData));
        // setAllValues(allValues = flatten(data));
        setLoading(false);
    };
    const transformed = ['2004'];
    const palletRpc = 'crowdloan';
    const callable = 'funds';

    const fan = async () => {
        await api.query[palletRpc][callable](...transformed, queryResHandler);
    };

    let [allValues, setAllValues] = useState({
        // raised: null,
        // end: null,
        // cap: null,
        // lastContribution: { preEnding: null },
        // firstPeriod: null,
        // lastPeriod: null,
    });

    if (Object.keys(allValues).length == 0) {
        fan();
    }

    return (
        <div>
            <h1>Crowdloan Funds</h1>
            {loading
                ? (
                    <div>loading...</div>
                )
                : (
                    <div>
                        {/* {Object.keys(allValues).map((key, i) => (
                            <p key={i}>
                                <span>{key}: </span>
                                <span>{allValues[key]}</span>
                            </p>
                        ))} */}
                        <div>raised: {(allValues.raised)}</div>
                        <div>end: {allValues.end}</div>
                        <div>cap: {(allValues.cap)}</div>
                        <div>last_contribution.preEnding: {allValues.lastContribution.PreEnding}</div>
                        <div>first_period: {allValues.firstPeriod}</div>
                        <div>last_period: {allValues.lastPeriod}</div>
                    </div>
                )}
        </div >
    );
}
