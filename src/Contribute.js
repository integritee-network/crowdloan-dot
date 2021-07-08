import React, { useState } from 'react';
import { Form, Input, Grid } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import { useSubstrate } from './substrate-lib';

export default function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  const { accountPair } = props;

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));

  const { amount } = formState;
  const paraId = '2015';
  const palletRpc = 'crowdloan';
  const callable = 'funds';
  const transformed = ['2004'];

  const [maxContribution, setMaxContribution] = useState(0);
  const queryResHandler = result => {
    const humanData = result.toJSON();
    setMaxContribution(BigInt(humanData.cap - humanData.raised));
  };
  const getCrowdLoanData = async () => {
    await api.query[palletRpc][callable](...transformed, queryResHandler);
  };

  if (maxContribution === 0) {
    getCrowdLoanData();
  }
  return (
    <Grid.Column width={8}>
      <h1>Contribute</h1>
      <Form>
        <Form.Field>
          <Input
            fluid
            label='Amount in KSM'
            type='number'
            state='amount'
            step='0.1'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Contribute'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'crowdloan',
              callable: 'contribute',
              inputParams: [paraId, BigInt(amount * Math.pow(10, 12)), null],
              paramFields: [true, true, false],
              maxContribution: maxContribution
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}
