import { isNull } from '@polkadot/util';
import React, { useEffect, useState } from 'react';
// import { Grid, Form, Dropdown, Input, Label } from 'semantic-ui-react';

import responseForm from './response.json';
// import ElementItem from './substrate-lib/components/ElementItem';
// import userform from './formElement.json'

import { useSubstrate } from './substrate-lib';
// import { TxButton, TxGroupButton } from './substrate-lib/components';

function Main(props) {
  const { api, jsonrpc } = useSubstrate();
  const { accountPair } = props;
  const [status, setStatus] = useState(null);

  // const [elements, setElements] = useState(null);
  // useEffect(() => {
  //   setElements(responseForm);
  // }, []);
  // const { depositor, page_label } = elements ?? {}

  const [unsub, setUnsub] = useState(null);
  const transformed = ['2004'];
  const palletRpc = 'crowdloan';
  const callable = 'funds';

  // const [Data, setData] = useState({
  //   depositor: '',
  //   verifier: '',
  //   deposit: 0,
  //   raised: '',
  //   end: 0,
  //   cap: '',
  //   lastContribution: { ending: 0 },
  //   firstPeriod: 0,
  //   lastPeriod: 0,
  //   trieIndex: 0,
  // })

  const [Data, setData] = useState(null)

  useEffect(() => {
    if (isNull(Data)) {
      query();
    }
  })

  const query = async () => {
    const unsub = await api.query[palletRpc][callable](...transformed, queryResHandler);
    setUnsub(() => unsub);
  };

  const queryResHandler = result => {
    console.log('Response from main API: ', result);
    console.log('result.data: ', result.data);
    let resultJson = JSON.parse(result);
    if (isNull(Data)) {
      setData(resultJson);
    }
    // setData({ depositor: resultdata.depositor, raised: resultJson.raised })
    console.log(Data);
    console.log(result.toString());
    result.isNone ? setStatus('None') : setStatus(result);
  }

  // componentDidMount()
  // {
  //   const query = async () => {
  //     const unsub = await api.query[palletRpc][callable](...transformed, queryResHandler);
  //     // setUnsub(() => unsub);}

  //   };
  // }

  const sampleJSON = {
    object: {
      name: "Pluralsight",
      number: 1,
      address: "India",
      website: "https://www.pluralsight.com/"
    }
  };

  return (
    <div className="AppContainer" >
      <h1>Crowdloan Fund</h1>
      <p>"depositor": {Data.depositor}</p>
      <p>"verifier": {responseForm.verifier}</p>
      <p>"deposit":: {responseForm.deposit}</p>
      <p>"raised": {Data.raised}</p>
      <p>"end": {responseForm.end}</p>
      <p>"cap": {responseForm.cap}</p>
      <p>"lastContribution.ending": {responseForm.lastContribution.ending}</p>
      <p>"firstPeriod": {responseForm.firstPeriod}</p>
      <p>"lastPeriod": {responseForm.lastPeriod}</p>
      <p>"trieIndex": {responseForm.trieIndex}</p>

      {/* <h2>Array of Objects:</h2>
      <ul>
        {responseForm.map((item, i) => {
          return <li key={i}>{item.a} - {item.b}</li>
        })}
      </ul>
      // the following doesn't work, because lastContribution is an object containing a key,value pair
      {Object.keys(responseForm).map((key, i) => (
        <p key={i}>
          <span>Key Name: {key}</span>
          <span>Value: {responseForm[key]}</span>
        </p>
      ))} */}
    </div >
  );

}

export default function Interactor(props) {
  const { api } = useSubstrate();
  return api.tx ? <Main {...props} /> : null;
}
