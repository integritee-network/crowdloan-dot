import React, { useState } from 'react';
import { Form, Input, Grid, Label, Icon } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';

export default function Main(props) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  const { accountPair } = props;

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));

  const { amount } = formState;
  const paraId = '2015';

  return (
    <Grid.Column width={8}>
      <h1>Contribute</h1>
      <Form>
        <Form.Field>
          <Label basic color='teal'>
            <Icon name='hand point right' />
            1 Unit = 1000000000000&nbsp;
          </Label>
          <Label basic color='teal' style={{ marginLeft: 0, marginTop: '.5em' }}>
            <Icon name='hand point right' />
            Transfer more than the existential amount for account with 0 balance
          </Label>
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label='Amount'
            type='number'
            state='amount'
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
              inputParams: [paraId, amount, null],
              paramFields: [true, true, false]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}
