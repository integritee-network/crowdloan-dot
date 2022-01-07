import React, { useState, createRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import UpperMenu from './UpperMenu';
import Why from './Why';
import Faq from './Faq';
import './css/App.css';
import How from './How';
import Participate from './Participate';
import Value from './Value';
import Rewards from './Rewards';
import EarlySporter from './EarlySupporter';
import Roadmap from './Roadmap';
import Clients from './clients';
import Referral from './Referral';
import Support from './SupporterReward';
import Footer from './Footer';
import LoyalityRewards from './LoyalityRewards';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatBalance } from '@polkadot/util';
import { useGlobalState } from './state';

function Main () {
  const [, setAccountAddress] = useState(null);
  const { apiState } = useSubstrate();
  const { api } = useSubstrate();
  const [crowdLoanRunning] = useGlobalState('crowdLoanRunning');
  let decimals = 0;
  let chainTokens = '';

  if (api && api.registry && (decimals === 0 || chainTokens === '')) {
    decimals = api.registry.chainDecimals;
    console.log('decimal set to: ' + decimals);
    chainTokens = api.registry.chainTokens[0];
    console.log('chainTokens set to: ' + chainTokens);
    formatBalance.setDefaults({
      decimals: decimals,
      unit: chainTokens
    });
  }

  const contextRef = createRef();
  console.log(apiState);

  return (
    <div ref={contextRef}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <UpperMenu setAccountAddress={setAccountAddress} />
      <Why />
      <Rewards />
      <EarlySporter />
      <Support />
      <LoyalityRewards />
      <Referral />
      {apiState !== 'READY' || !crowdLoanRunning ? <></> : <Participate />}
      <Value />
      <How />
      <Roadmap />
      <Faq />
      <Clients />
      <Footer />
    </div>
  );
}

export default function App () {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
