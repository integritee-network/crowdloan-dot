import React, { useState, useEffect, useMemo } from 'react';
import './css/App.css';
import {
  Container,
  Button,
  Grid,
  Input,
  Checkbox,
  Modal,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import icon0 from './Images/i0.svg';
import icon4 from './Images/polkadot.png';
import icon5 from './Images/fearless-wallet.png';
// import icon6 from './Images/Newland.png';
// import icon7 from './Images/gate.png';
// import icon8 from './Images/kraken.png';
import icon9 from './Images/nova-wallet-logo.png';
import icon10 from './Images/bifrost.png';
import Slider from 'react-slick';
import { TxButton } from './substrate-lib/components';
import { useSubstrate } from './substrate-lib';
import AccountSelector from './AccountSelector';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import EmbedVideo from './EmbedVideo';
// import { P } from 'glamorous';
import { formatBalance } from '@polkadot/util';

import config from './config';

export default function Participate (props) {
  const mnemonic = mnemonicGenerate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({
    addressTo: null,
    amount: 5.0
  });
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(
    new URL(window.location.href).searchParams.get('ref')
  );
  // const { accountPair } = props;
  const [disableButton, setDisableButton] = useState(true);
  const [crowdLoanEnded, setCrowdLoanEnded] = useState(false);
  const { api } = useSubstrate();
  const [blockNumber, setBlockNumber] = useState(0);
  const [crowdLoanData, setCrowdLoanData] = useState({});
  const { amount } = formState;
  const paraId = config.PARACHAIN_ID;

  const bestNumber = api.derive.chain.bestNumber;

  const [accountAddress, setAccountAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);
  const [estimatedFee, setEstimatedFee] = useState('0.0126 DOT');
  const minimumParticipation = 50000000000; // 5 DOT
  const divide = 10000000000;

  useEffect(() => {
    // console.log('1****************');
    // console.log(accountBalance);
    // console.log('1****************');
    if (accountBalance < minimumParticipation) {
      setDisableButton(true);
      setStatus('You do not have enough balance');
    } else {
      setDisableButton(false);
      setStatus('');
    }
  }, [accountBalance]);

  useEffect(() => {
    let unsubscribeAll = null;
    bestNumber((number) => {
      setBlockNumber(number.toNumber());
    })
      .then((unsub) => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [bestNumber]);

  const { keyring, keyringState } = useSubstrate();
  // const { apiState, keyring, keyringState, apiError } = useSubstrate();

  try {
    keyring.setSS58Format(0); // 0 - Polkadot, 2 - Kusama https://polkadot.js.org/docs/keyring/start/ss58/
  } catch (error) {
    console.log(error);
  }

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  useEffect(() => {
    if (crowdLoanData && blockNumber >= crowdLoanData.end && blockNumber > 0 && Object.keys(crowdLoanData).length !== 0) {
      setDisableButton(true);
      setCrowdLoanEnded(true);
      setStatus('crowdloan has ended');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  useEffect(() => {
    const queryResHandler = (result) => {
      setCrowdLoanData(result.toJSON());
    };
    const crowdLoan = async () => {
      await api.query.crowdloan.funds([paraId], queryResHandler);
    };
    crowdLoan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = async (_, data) => {
    setFormState((prev) => ({ ...prev, [data.state]: data.value }));
    // let estimate = 0;
    if (!crowdLoanEnded) {
      if (data.value >= 5) {
        try {
          const txExcecuteDummy = api.tx.crowdloan.contribute(paraId, Math.pow(10, 10), null);
          const info = await txExcecuteDummy.paymentInfo(accountAddress);
          setEstimatedFee(() => info.partialFee.toHuman());
        } catch (error) {
          console.log(error);
        }
        // estimate = parseInt(info.partialFee);
      }
      if (accountBalance < minimumParticipation) {
        setDisableButton(true);
        setStatus('You do not have enough balance');
      } else if (data.value === '' || data.value < minimumParticipation / divide) {
        setDisableButton(true);
        setStatus('Please enter amount equal or greater than ' + minimumParticipation / divide);
      } else if (data.value > accountBalance / divide) {
        setDisableButton(true);
        setStatus('Please enter amount equal or less than ' + formatBalance(accountBalance));
      } else {
        setDisableButton(false);
        setStatus('');
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let slider1 = useMemo(() => [], []);
  let slider2 = useMemo(() => [], []);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);
  const settings = {
    dots: false,
    dotsClass: 'slick-dots slick-thumb',
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='participatesection'>

      {loading && (
        <Dimmer active>
          <Loader size='big'>
            Transaction in process
            <br />
            Please wait while the transaction is completed
            <br />
            If you accidentally closed the polkadot{'{'}.js{'}'} extension, you can reopen it and continue your ongoing transaction
          </Loader>
        </Dimmer>
      )}

      <div className='participate' id='participate'>
        <Modal size='mini' open={open}>
          <Modal.Header>Generate Referral Code</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <span>{mnemonic}</span>
              <Input type='email' fluid placeholder='email' value='' />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)} content='Send' positive />
          </Modal.Actions>
        </Modal>

        <Container>
          <div className='text'>
            <span>5 WAYS TO TAKE PART</span>
            <h1>Participate in the Integritee Crowdloan!</h1>
          </div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5} className='participate-tabs'>
                <Slider
                  {...settings}
                  className='left-slider'
                  asNavFor={nav1}
                  ref={(slider) => (slider2 = slider)}
                  slidesToShow={5}
                  vertical='true'
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  <div>
                    <div className='main'>
                      <div className='onthissiteicon'>
                        <span>ON THIS SITE</span>
                        <div className='image-holder'>
                          <img src={icon0} alt='icon' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className='main'>
                      <div>
                        <span>USING POLKADOT-JS APPS</span>
                        <div className='image-holder'>
                          <img src={icon4} alt='icon'/>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div>

                  <br/>
                  <br/>
                    <div className='main'>
                      <div>
                        <span>USING FEARLESS WALLET</span>
                        <div className='image-holder'>
                          <img src={icon5} alt='icon' />
                        </div>
                      </div>

                    </div>
                  </div>
                  {/* <div>
                    <br/>
                    <br/>

                    <div className='main'>
                      <div>
                        <span>THROUGH GATE.IO</span>
                        <div className='image-holder'>
                          <img src={icon7} alt='icon' />
                        </div>
                      </div>
                    </div>

                  </div> */}
                  {/* <div>
                    <br/>
                    <br/>
                    <br/>

                    <div className='main'>
                      <div>
                        <span>THROUGH KRAKEN</span>
                        <div className='image-holder'>
                          <img src={icon8} alt='icon' />
                        </div>
                      </div>
                    </div>

                  </div> */}
                  <div>
                  <br/>
                    <br/>
                    <br/>
                    <br/>

                    <div className='main'>
                      <div>
                        <span>THROUGH NOVA WALLET</span>
                        <div className='image-holder'>
                          <img src={icon9} alt='icon' />
                        </div>
                      </div>
                    </div>

                  </div>

                  <div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <div className='main'>
                      <div>
                        <span>Bifrost SALP Contribution</span>
                        <div className='image-holder'>
                          <img src={icon10} alt='icon' />
                        </div>
                      </div>
                    </div>

                  </div>

                </Slider>
              </Grid.Column>
              <Grid.Column className='right-section' width={10}>
              <Slider
                  {...settings}
                  asNavFor={nav2}
                  ref={(slider) => (slider1 = slider)}
                >
                  <div>
                    <h2>On this site</h2>
                    <ol>
                      <li>
                        Download the Polkadot Browser extension for
                        Chrome/Firefox{' '}
                        <a href='https://polkadot.js.org/extension/'>here</a>.
                      </li>
                      <li>
                        Ensure that you have&nbsp;
                        <a href='https://guide.kusama.network/docs/maintain-guides-how-to-unbond/'>
                          unbonded
                        </a>{' '}
                        DOT in your Polkadot.js account.
                      </li>
                    </ol>

                    <AccountSelector
                      className='accounts-section'
                      setAccountAddress={setAccountAddress}
                      setAccountBalancee={setAccountBalance}
                    />

                    {/* <div className={'polkadot_status'}>{status}</div> */}

                    <div className='form mb-5'>
                      <div className='boxes'>
                        <label>DOT to Lock Up:</label>
                        <Input
                          text='tel'
                          type='number'
                          min={5}
                          step='0.1'
                          value={amount}
                          state='amount'
                          placeholder='Enter DOT Amount'
                          onChange={onChange}
                          pattern='^([1-9](?:\.[1-9])?|0?\.[1-9])$'
                        />
                      </div>
                    </div>
                    <br />
                    <br />
                    <form onSubmit={onSubmit}>
                      <Grid>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <Checkbox
                              label={{
                                children: 'Generate referral code'
                              }}
                              onClick={() => setToggleOne(!toggleOne)}
                            />
                            <div>
                              <br />
                              {toggleOne
                                ? (
                                <Input
                                  required
                                  id='grc'
                                  type='email'
                                  pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                                  placeholder='Enter Email'
                                />
                                  )
                                : null}
                            </div>
                            <br />
                          </Grid.Column>
                          <Grid.Column>
                            <Checkbox
                              checked={toggleTwo}
                              label={{
                                children: 'Enter referral code'
                              }}
                              onClick={() => setToggleTwo(!toggleTwo)}
                            />
                            <div>
                              <br />
                              {toggleTwo
                                ? (
                                    new URL(window.location.href).searchParams.get(
                                      'ref'
                                    )
                                      ? (
                                  <Input
                                    required
                                    readOnly
                                    defaultValue={new URL(
                                      window.location.href
                                    ).searchParams.get('ref')}
                                    id='erc'
                                    type='text'
                                    placeholder='Enter Referral Code'
                                  />
                                        )
                                      : (
                                  <Input
                                    required
                                    id='erc'
                                    type='text'
                                    placeholder='Enter Referral Code'
                                  />
                                        )
                                  )
                                : null}
                            </div>
                            <br />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid.Column>
                        <div>
                          Estimated fees: {estimatedFee} <br /> Please make sure when contributing, that your balance can cover the fees
                        </div>
                      </Grid.Column>
                      <TxButton
                        setLoading={setLoading}
                        accountAddress={accountAddress}
                        formState={formState}
                        grc={
                          document.getElementById('grc')
                            ? document.getElementById('grc').value
                            : ''
                        }
                        erc={
                          document.getElementById('erc')
                            ? document.getElementById('erc').value
                            : ''
                        }
                        accountPair={accountPair}
                        label='Participate Now'
                        type='SIGNED-TX'
                        setStatus={setStatus}
                        attrs={{
                          palletRpc: 'crowdloan',
                          callable: 'contribute',
                          inputParams: [
                            paraId,
                            amount * Math.pow(10, 10),
                            null
                          ],
                          paramFields: [true, true, false],
                          disableButton: disableButton
                        }}
                      />
                    </form>
                    <div className={'polkadot_status'}>{status}</div>
                  </div>

                  {/* <div>
                <h2>Through an Exchange</h2>
                <p>
                  If you hold DOT on a crypto exchange, it may provide
                  functionality to participate in Polkadot crowdloans from your
                  user account.{" "}
                </p>
                <div className="click">
                  Click on one of the exchanges below for more details:
                </div>
                <div className="image-holder">
                  <div className="images">
                    <img src={icon1} />
                  </div>
                  <div className="images">
                    <img src={icon2} />
                  </div>
                  <div className="images">
                    <img src={icon3} />
                  </div>
                </div>
              </div> */}
                  <div>
                    <h2>Using Polkadot-JS Apps</h2>
                    <p>Follow the instructions detailed in this video:</p>

                    <EmbedVideo style={{ width: '100%' }} />
                    <p>
                    Note: The only way to benefit from the Integritee Crowdloan Referral Program is by contributing on this site.
                    </p>
                  </div>
                  <div>
                  <h2>Using Fearless Wallet</h2>
                  <br/>
                  <br/>
                    <ol>
                      <li>
                      Download the App on the&nbsp;
                      <a href='https://apps.apple.com/us/app/fearless-wallet/id1537251089'>App Store</a> or on&nbsp;
                      <a href='https://play.google.com/store/apps/details?id=jp.co.soramitsu.fearless'>Google Play</a>
                      </li>
                      <br/>
                      <li>
                      Import or create and fund an account
                      </li>
                      <br/>
                      <li>
                      Choose the Polkadot Network
                      </li>
                      <br/>
                      <li>
                      Go to Crowdloans and click on Integritee Network (TEER)
                      </li>
                      <br/>
                      <li>
                      Contribute to the crowdloan
                      </li>
                      <br/>
                    </ol>
                    <br/>
                    <p>
                    Note: The only way to benefit from the Integritee Crowdloan Referral Program is by contributing on this site.
                    </p>
                  </div>
                  {/* <div>
                  <h2>Through Newland Finance</h2>
                  <br/>
                  <br/>
                    <ol>
                      <li>
                      Download the Polkadot browser extension&nbsp;
                      <a href='https://polkadot.js.org/extension/'>here</a>&nbsp;
                        and ensure that you have enough unbonded DOT in your account.

                      </li>
                      <br/>
                      <li>
                      Find Integritee on the list of DOT projects&nbsp;
                      <a href='https://dot.newland.finance/'>here</a>.&nbsp;
                       The system will automatically connect to your Polkadot wallet.

                      </li>
                      <br/>
                      <li>
                      Click “Ongoing” in the Integritee listing, enter your contribution and confirm with your wallet password. It will take a little time to complete the transaction.
                      </li>
                      <br/>
                     <p>On mobile, you can use Math Wallet or TokenPocket Wallet to participate. The process is similar to that described above.</p>
                    </ol>
                    <br/>
                    <p>
                    Note: The only way to benefit from the Integritee Crowdloan Referral Program is by contributing on this site.
                    </p>
                  </div> */}
                  {/* <div>
                  <h2>Through Gate.io</h2>
                  <br/>
                  <br/>
                    <ol>
                      <li>
                      Create a&nbsp;
                      <a href='https://www.gate.io/login'>Gate.io</a>&nbsp;
                      account and ensure that you have enough unbonded DOT in your account.
                      </li>
                      <br/>
                      <li>
                      Navigate to&nbsp;
                      <a href='https://www.gate.io/hodl/759'>Integritee</a>&nbsp;
                      in the HODL and Earn list (under the Finance menu).
                      </li>
                      <br/>
                      <li>
                      Enter the amount of DOT you want to contribute and click “Subscribe”.
                      </li>
                      <br/>
                    </ol>
                    <br/>
                    <p>
                    Note: The only way to benefit from the Integritee Crowdloan Referral Program is by contributing on this site.
                    </p>
                  </div> */}

                  {/* <div>
                  <h2>Through Kraken</h2>
                  <br/>
                  <br/>
                    <ol>
                      <li>
                      Create or log in to your <a href="https://www.kraken.com/sign-up">Kraken</a> account
                      account and ensure that you have enough unbonded DOT in your account.
                      </li>
                      <br/>
                      <li>
                      Deposit or buy Polkadot (DOT)
                      </li>
                      <br/>
                      <li>
                      Navigate to 'Earn', and then click on 'Parachains'
                      </li>
                      <br/>
                      <li>
                      Choose 'Integritee'
                      </li>
                      <br/>
                      <li>
                      Enter the amount of DOT you wish to contribute
                      </li>
                      <br/>
                      <li>
                      Select 'contribute' and confirm
                      </li>
                      <br/>
                    </ol>
                    <br/>
                    <p>
                    Note: The only way to benefit from the Integritee Crowdloan Referral Program is by contributing on this site.
                    </p>
                  </div> */}

                  <div>
                  <h2>Using Nova Wallet</h2>
                  <br/>
                  <br/>
                    <ol>
                      <li>
                      Download the App on the&nbsp;
                      <a href='https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355'>App Store</a> or on&nbsp;
                      <a href='https://play.google.com/store/apps/details?id=io.novafoundation.nova.market'>Google Play</a>
                      </li>
                      <br/>
                      <li>
                      Import or create and fund an account
                      </li>
                      <br/>
                      <li>
                      Go to Crowdloans
                      </li>
                      <br/>
                      <li>
                      Choose the Polkadot Network  and click on Integritee Network (TEER)
                      </li>
                      <br/>
                      <li>
                      Contribute to the crowdloan
                      </li>
                      <br/>
                    </ol>
                    <br/>
                    <p>
                    Note: The only way to benefit from the Integritee Crowdloan Referral Program is by contributing on this site.
                    </p>
                  </div>

                  <div>
                  <h2>Bifrost SALP Contribution</h2>
                  <br/>
                  <br/>
                    <ol>
                      <li>
                      Go to <a href='https://bifrost.app/vcrowdloan'>https://bifrost.app/vcrowdloan</a>
                      </li>
                      <br/>
                      <li>
                      Connect your polkadot.js Wallet
                      </li>
                      <br/>
                      <li>
                      Select Integritee Shell for contribution
                      </li>
                      <br/>
                      <li>
                      Enter Amount and click add
                      </li>
                      <br/>
                    </ol>
                    <br/>
                    <p>
                    * contribution rewards mentioned on the Bifrost App are valid for Bifrost users <br/>
                    For more information what SALP is, <a href='https://medium.com/bifrost-finance/bifrost-salp-release-crowdloan-liquidity-for-participants-c7566fe6cf83' style={{ color: '#fff', 'font-weight': 'bold', 'text-decoration': 'underline' }} target='_blank' rel='noreferrer'>check this article</a>
                    </p>
                    <p>
                    Note: The only way to benefit from the Integritee Crowdloan Referral Program is by contributing on this site.
                    </p>

                  </div>
                </Slider>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
