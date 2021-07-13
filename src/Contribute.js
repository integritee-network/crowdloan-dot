import React, { useEffect, useState } from 'react';
import { Form, Input, Grid } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import { useSubstrate } from './substrate-lib';

export default function Main (props) {
  const [status, setStatus] = useState(null);
  const [unsub, setUnsub] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  const { accountPair } = props;
  const [disableButton, setDisableButton] = useState(true);
  const { api } = useSubstrate();
  const [blockNumber, setBlockNumber] = useState(0);
  const [crowdLoanData, setCrowdLoanData] = useState({});
  const { amount } = formState;
  const paraId = '2015';

  const onChange = (_, data) => {
    setFormState(prev => ({ ...prev, [data.state]: data.value }));
    if (data.value === '' || data.value <= 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const bestNumber = api.derive.chain.bestNumber;
  useEffect(() => {
    let unsubscribeAll = null;
    bestNumber(number => {
      setBlockNumber(number.toNumber());
    })
      .then(unsub => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);
    return () => unsubscribeAll && unsubscribeAll();
  }, []);

  useEffect(() => {
    if (crowdLoanData.end >= blockNumber && blockNumber > 0 && crowdLoanData && Object.keys(crowdLoanData).length != 0) {
      setDisableButton(true);
      setStatus('crowdloan has ended');
    }
  }, [blockNumber])

  useEffect(() => {
    const queryResHandler = result => {
      console.log(blockNumber);
      setCrowdLoanData(result.toJSON());
    };
    const crowdLoan = async () => {
      const unsub = await api.query.crowdloan.funds(['2004'], queryResHandler);
      setUnsub(() => unsub);
    };
    crowdLoan();
  }, [])

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
