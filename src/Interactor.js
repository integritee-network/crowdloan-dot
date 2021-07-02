import React, { useEffect, useState } from 'react';
import { Grid, Form, Dropdown, Input, Label } from 'semantic-ui-react';

import responseForm from './response.json';
import ElementItem from './substrate-lib/components/ElementItem';
import userform from './formElement.json'

import { useSubstrate } from './substrate-lib';
import { TxButton, TxGroupButton } from './substrate-lib/components';

const argIsOptional = (arg) =>
  arg.type.toString().startsWith('Option<');

function Main(props) {
  const { api, jsonrpc } = useSubstrate();
  const { accountPair } = props;
  const [status, setStatus] = useState(null);

  // const [elements, setElements] = useState(null);
  // useEffect(() => {
  //   setElements(responseForm);
  // }, []);
  // const { depositor, page_label } = elements ?? {}

  const [interxType, setInterxType] = useState('QUERY');
  const [palletRPCs, setPalletRPCs] = useState([]);
  const [callables, setCallables] = useState([]);
  const [paramFields, setParamFields] = useState([]);

  const transformed = ['2004'];
  const palletRpc = 'crowdloan';
  const callable = 'fund';

  const [Data, setData] = useState({
    depositor: '',
    verifier: '',
    deposit: 0,
    raised: '',
    end: 0,
    cap: '',
    lastContribution: { "ending": 0 },
    firstPeriod: 0,
    lastPeriod: 0,
    trieIndex: 0,
  })

  useEffect(result => {
    query()
  })

  const queryResHandler = result => {
    // console.log(result.toString())
    // let resultAsString = ''
    // Object.keys(JSON.parse(result)).forEach(function (k) {
    //   resultAsString += k + ' - ' + JSON.parse(result)[k];
    // });
    result.isNone ? setStatus('None') : setStatus(result);
  }

  const query = async () => {
    const unsub = await api.query[palletRpc][callable](...transformed, queryResHandler);
    setUnsub(() => unsub);
  };

  const sampleJSON = {
    "object": {
      "name": "Pluralsight",
      "number": 1,
      "address": "India",
      "website": "https://www.pluralsight.com/"
    }
  };

  return (
    <div className="AppContainer" >
      <h1>Crowdloan Fund</h1>
      <p>"depositor": {responseForm.depositor}</p>
      <p>"verifier": {responseForm.verifier}</p>
      <p>"deposit":: {responseForm.deposit}</p>
      <p>"raised": {responseForm.raised}</p>
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
