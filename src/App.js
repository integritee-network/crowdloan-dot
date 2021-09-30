import React, { useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';

import UpperMenu from './UpperMenu';
import Contribute from './Contribute';
import Crowdloan from './Crowdloan';
import Why from './Why';
import Faq from './Faq';
import './css/App.css';
import ThreeBox from './ThreeBox';
import How from './How';
import NFTsection from './NFTSection';
import Participate from './Participate';
import Value from './Value';
import Rewards from './Rewards';
import Roadmap from './Roadmap';
import Clients from './clients';
import Referral from './Referral';
import Support from './SupporterReward';
import SupportM from './SupportRewardMobile';
import Footer from './Footer';
import Leaderboard from './Leaderboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Main () {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState, apiError } = useSubstrate();
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const loader = text =>
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>;

  const message = err =>
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message negative compact floating
          header='Error Connecting to Substrate'
          content={`${JSON.stringify(err, null, 4)}`}
        />
      </Grid.Column>
    </Grid>;

  //  if (apiState === 'ERROR') return message(apiError);
  //  else if (apiState !== 'READY') return loader('Connecting to Kusama');

  //  if (keyringState !== 'READY') {
  //    return loader('Loading accounts (please review any extension\'s authorization)');
  //  }

  // const anchor = document.querySelector('#some-id')
  // anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })

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
      {/* <Leaderboard /> */}
        <ThreeBox />
        <How />
        <Support />
        <SupportM />
        <Referral />
        <NFTsection />
      {/* <Participate /> */}
      {apiState !== "READY" ? <></> : <Participate />}
      {/* <Contribute id='#contribute' accountPair={accountPair} /> */}
        
        
        <Rewards />
        
        <Value />
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
