import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Playground () {
    // const x = require('contributions.json')

    const [data, setData] = useState([]);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    var allData = [];
    var contributing = [];
    var timeStamp = [];

    function make_api_call (page) {
        console.log(page);
        return fetch('https://kusama.api.subscan.io/api/scan/parachain/contributes'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': 'f61b3cd451cee62383692c528215d12c',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    row: 100,
                    page: page,
                    from_history: true,
                    para_id: 2004
                })
            }
        )
    }

    async function processUsers () {
        let result;
        for (let i = 0; i < 60; i++) {
            result = await (await make_api_call(i)).json();
            if (result && result.data && result.data.contributes !== undefined)
                var contributes = result.data.contributes;
            if (contributes !== null) {
                {
                    allData.push(contributes);
                    contributes.map(i => {
                        contributing.push(i.contributing);
                        timeStamp.push(unixToDateConverter(i.block_timestamp));
                    })
                }
            }
            else {
                console.log("all data filled");
                setAllDataLoaded(true);
                break;
            }
        }
        return allData;
    }

    async function doTask () {
        let result = await processUsers();
        console.log(result);
    }

    doTask();

    // const getData = async (body) => {
    // fetch('https://kusama.api.subscan.io/api/scan/parachain/contributes'
    //     , {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-API-Key': 'f61b3cd451cee62383692c528215d12c',
    //             Accept: 'application/json'
    //         },
    //         body: JSON.stringify(body)
    //     }
    // )
    //         .then(function (response) {
    //             // console.log(response);
    //             return response.json();
    //         })
    //         .then(function (myJson) {
    //             // console.log(Object.values(myJson.data).filter(a => a.who));
    //             if (myJson.data.contributes !== null) {
    //                 setData(data => [...data, myJson.data.contributes]);
    //                 // setData(data.push(myJson.data.contributes));
    //                 // allData.push(myJson.data.contributes);
    //             }
    //             else { setAllDataLoaded(true); }
    //         });
    // };
    // var page = page + 1;
    // useEffect(() => {
    //     page = page + 1;
    //     let body = {
    // row: 100,
    // page: page,
    // from_history: true,
    // para_id: 2004
    //     };
    //     getData(body);
    // });

    // useEffect(() => {
    //     // if (data.contributes !== undefined) {
    //     //     data.contributes.map(i => {
    //     //         contributing.push(i.contributing);
    //     //         timeStamp.push(i.block_timestamp);
    //     //     })
    //     // }
    // }, [data]);

    const unixToDateConverter = (unix_timestamp) => {
        const date = new Date(unix_timestamp * 1000);

        // Hours part from the timestamp
        const hours = date.getHours();
        // Minutes part from the timestamp
        const minutes = '0' + date.getMinutes();
        // Seconds part from the timestamp
        const seconds = '0' + date.getSeconds();

        // Will display time in 10:30:23 format
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return date;
    }

    return (
        <div className="Playground">
            <h1>Playground</h1>
            {/* {data.contributes !== undefined ? ( */}
            {contributing && contributing.length !== 0 ? (
                <Plot
                    data={[
                        {
                            // x: formattedArray[0],
                            // y: formattedArray[1],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' }
                        },
                        { type: 'bar', x: formattedArray[0], y: formattedArray[1] }
                    ]}
                    layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
                />) : <p>loading</p>}
            {/* {
                 data && data.length > 0 && data.map((item) => <p>{item}</p>)
             } */}
        </div>
    );
}

export default Playground;
