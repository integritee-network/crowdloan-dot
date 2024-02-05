import './css/App.css';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';
import React, { useState } from 'react';
import { useGlobalState, setCrowdLoanRunning } from './state';
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
  const [crowdLoanRunning] = useGlobalState('crowdLoanRunning');

  const queryResHandler = result => {
    const toHumanData = result.toJSON();
    setCrowdLoan(crowdLoan = (toHumanData));
    if (toHumanData != null) {
      // FIXME: Deactivate if crowdloan finished. had to hard-disable after winning
      setCrowdLoanRunning(config.CROWDLOAN_RUNNING);
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
    <div className="why">
      <Container>
        <div className="text">
          <span>WHY OUR PARACHAIN?</span>
          <h1>Support Integritee’s Parachain Bids</h1>
          <p>
            Integritee enables developers and firms to process sensitive data, without
            compromising on privacy. Our platform combines the trust of blockchain with
            the confidentiality of off -chain, Trusted Execution Environments (TEEs).
            We enable decentralized data-driven apps and services to can securely process
            sensitive data, without revealing it on chain.
          </p>
          <p>
          The Integritee ecosystem, across all instances
on Kusama, Polkadot and elsewhere, is
powered by our native token, TEER. Backers
who support our parachain bids by temporarily
locking in DOT will be rewarded in TEER.
          </p>
      
          {crowdLoanRunning &&
                            <a className="gradient-btn "  href='#participate'>
                                Participate Now!
                            </a>
                            }
                            {!crowdLoanRunning &&
                            <a className="gradient-btn "  href="https://mailchi.mp/integritee/get-notified">Get Notified!</a>
                            }
        </div>
<br></br>
<br></br>

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
