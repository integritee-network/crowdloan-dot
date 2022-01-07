import './css/App.css';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';
import React, { useState } from 'react';
import { useGlobalState, setCrowdLoanRunning } from './state';
import { BN, bnToBn } from '@polkadot/util/bn/index.js';
import config from './config';

function toUnit (balance, decimals, unit = 'KSM') {
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
      setCrowdLoanRunning(true);
    }
    console.log('**set-----------------------');
    setLoading(false);
  };

  const [chainDecimals, setChainDecimals] = useState(0);
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

  if (api && api.registry && chainDecimals === 0) {
    setChainDecimals(() => api.registry.chainDecimals);
  }
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
            Integritee enables developers and firms to process sensitive data,
            without compromising on privacy. Our platform combines the trust of
            blockchain with the confidentiality of off-chain, trusted execution
            environments (TEEs). This enables developers and firms to create
            decentralized data-driven apps and services that can securely
            process sensitive data, without revealing it on chain.
          </p>
          <p>
            The Integritee ecosystem, across all instances on Kusama, Polkadot
            and elsewhere, will be powered by our native token, TEER. Backers
            who support our parachain bids by temporarily locking in KSM will be
            rewarded in TEER.
          </p>
          <p>
            We all know the problems with centralized data services. Integritee
            is the solution. Help us build a new internet where privacy comes as
            standard and earn TEER in the process.
          </p>
          {!crowdLoanRunning &&
          <a className="ui primary gradient-btn button" href="https://mailchi.mp/integritee/get-notified">Get Notified!</a>
          }

          {crowdLoanRunning &&
          <a className='ui primary gradient-btn button' href='#participate' >
            Participate Now!
          </a>
          }
        </div>
<br></br>
<br></br>

        {crowdLoan && (
        <ul className="counter">
          <li>
            <span>KSM CONTRIBUTED</span>
            {toUnit(crowdLoan.raised, chainDecimals)}<br/>
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
