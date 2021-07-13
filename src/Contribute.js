import React, { useState } from 'react';
import { Form, Input, Grid } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import { useSubstrate } from './substrate-lib';

export default function Main (props) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  const { accountPair } = props;
  const [disableButton, setDisableButton] = useState(true);
  const { api } = useSubstrate();
  const [blockNumber, setBlockNumber] = useState(0);

  const onChange = (_, data) => {
    setFormState(prev => ({ ...prev, [data.state]: data.value }));
    if (data.value === "" || data.value <= 0) {
      setDisableButton(true);
    }
    else { setDisableButton(false); }
  }
  const { amount } = formState;
  const paraId = '2015';

  const queryResHandler = result => {
    const resultAsJSON = result.toJSON();
    if (resultAsJSON.end >= blockNumber && blockNumber > 0) {
      // set disabled variable to true
      // setDisabledButton(true);
      setStatus('crowdloan has ended');
    }
  };
  const bestNumber = api.derive.chain.bestNumber;
  if (blockNumber === 0) {
    bestNumber(number => {
      setBlockNumber(number.toNumber());
    })
  }

  const crowdLoan = async () => {
    await api.query['crowdloan']['funds'](['2004'], queryResHandler);
  }
  crowdLoan();

  return (
    <Grid.Column width={8}>
      <h1>Contribute</h1>
      <Form>
        <Form.Field>
          <Input
            fluid
            label='Amount in KSM'
            type='number'
            value={amount}
            state='amount'
            step='0.1'
            min={0.1}
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
              inputParams: [paraId, amount * Math.pow(10, 12), null],
              paramFields: [true, true, false],
              disableButton: disableButton
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}
