import './css/App.css';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';
import React, { useState } from 'react';
import { setCrowdLoanRunning } from './state';
import { BN, bnToBn } from '@polkadot/util/bn/index.js';
import config from './config';

function toUnit (balance, decimals, unit = 'DOT') {
  balance = bnToBn(balance).toString();
  const base = new BN(10).pow(new BN(decimals));
  const dm = new BN(balance).divmod(base); // decimals, don't use them atm
  const x = parseFloat(dm.div.toString());
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + ' ' + unit;
}
export default function Main (props) {
  const { api } = useSubstrate();
  const [loading, setLoading] = useState(true);
  const paraId = config.PARACHAIN_ID;
  let [crowdLoan, setCrowdLoan] = useState(true);
  // const [crowdLoanRunning] = useGlobalState('crowdLoanRunning');

  const queryResHandler = result => {
    const toHumanData = result.toJSON();
    setCrowdLoan(crowdLoan = (toHumanData));
    if (toHumanData != null) {
      // FIXME: Deactivate if crowdloan finished. had to hard-disable after winning
      setCrowdLoanRunning(true);
    }
    console.log('**set-----------------------');
    setLoading(false);
  };

  const transformed = [paraId];
  const palletRpc = 'crowdloan';
  const callable = 'funds';

  const getCrowdLoanData = async () => {
    if (
      api &&
      api.query &&
      api.query[palletRpc] &&
      api.query[palletRpc][callable]
    ) {
      await api.query[palletRpc][callable](...transformed, queryResHandler);
    }
  };

  if (crowdLoan && Object.keys(crowdLoan).length === 0) {
    getCrowdLoanData().then(() =>
      console.log('**data---------------------------')
    );
  }
  return (
    <div className="contribution">
      <Container>
        {crowdLoan && (
        <ul className="counter">
          <li>
            <span>DOT CONTRIBUTED</span>
            {toUnit(crowdLoan.raised, 10)}<br/>
            {loading && (
              <Dimmer active>
                <Loader size='mini' inline='centered'>
                  Loading
                </Loader>
              </Dimmer>
            )}
          </li>
        </ul>)}

      </Container>
    </div>
  );
}
