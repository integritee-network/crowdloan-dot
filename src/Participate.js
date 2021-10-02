import React, { useState, useEffect } from 'react';
import './css/App.css';
import {
  Container,
  Button,
  Grid,
  Input,
  Checkbox,
  Modal,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import icon0 from './Images/i0.svg';
import icon4 from './Images/polkadot.png';
import icon5 from './Images/fearless-wallet.png';
import Slider from 'react-slick';
import { TxButton } from './substrate-lib/components';
import { useSubstrate } from './substrate-lib';
import AccountSelector from './AccountSelector';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import EmbedVideo from './EmbedVideo';
// import { P } from 'glamorous';

export default function Participate(props) {
  const mnemonic = mnemonicGenerate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({
    addressTo: null,
    amount: 0.1,
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
  const paraId = '2015';

  const bestNumber = api.derive.chain.bestNumber;

  const [accountAddress, setAccountAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    // console.log('1****************');
    // console.log(accountBalance);
    // console.log('1****************');
    if (accountBalance < 0.1) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestNumber]);

  const { apiState, keyring, keyringState, apiError } = useSubstrate();
  
  try {
    keyring.setSS58Format(2);
  } catch (error) {
    console.log(error);
  }

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  // disable contribution if crowdfunding has already ended: Enable this codeblock when going live
  // useEffect(() => {
  //   if (blockNumber >= crowdLoanData.end && blockNumber > 0 && crowdLoanData && Object.keys(crowdLoanData).length !== 0) {
  //     setDisableButton(true);
  //     setCrowdLoanEnded(true)
  //     setStatus('crowdloan has ended');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [blockNumber]);

  useEffect(() => {
    const queryResHandler = (result) => {
      setCrowdLoanData(result.toJSON());
    };
    const crowdLoan = async () => {
      await api.query.crowdloan.funds(['2015'], queryResHandler);
    };
    crowdLoan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (_, data) => {
    setFormState((prev) => ({ ...prev, [data.state]: data.value }));
    if (!crowdLoanEnded) {
      // if (data.value === '' || data.value <= 0 || data.value < 0.1) {
      if (data.value === '' || data.value < 0.1) {
        setDisableButton(true);
        setStatus('Please enter amount equal or greater than 0.1');
      } else if (data.value > accountBalance) {
        setDisableButton(true);
        setStatus(`Please enter amount equal or less than ${accountBalance}`);
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
  let slider1 = [];
  let slider2 = [];

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
    slidesToScroll: 1,
  };

  return (
    <div className='participatesection'>
      {/*
      <div className="NewsLetter">

      <p>

        Crowdlending will start soon – sign up to hear when it’s time to join in.
        </p>
        <div className="child">
        <a href="https://mailchi.mp/integritee/get-notified">
        <button id="participatebutton"  className="outline-btn with-icon">Get Notified</button>
          </a>
        </div>

      </div> */}

      {loading && (
        <Dimmer active>
          <Loader size='big'>
            Transaction in process
            <br />
            Please wait while the transaction is completed
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
            <span>3 WAYS TO TAKE PART</span>
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
                  slidesToShow={3}
                  vertical='true'
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  <div>
                    <div className='main'>
                      <div className='onthissiteicon'>
                        <span>ON THIS SITE</span>
                        <div className='image-holder'>
                          <img src={icon0} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                <div className="main">
                  <span>THROUGH AN EXCHANGE</span>
                  <div className="image-holder">
                    <img src={icon1} />
                  </div>
                  <div className="image-holder">
                    <img src={icon2} />
                  </div>
                  <div className="image-holder">
                    <img src={icon3} />
                  </div>
                </div>
              </div> */}
                  <div>
                    <div className='main'>
                      <div>
                        <span>USING POLKADOT-JS APPS</span>
                        <div className='image-holder'>
                          <img src={icon4} />
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
                          <img src={icon5} />
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
                        KSM in your Polkadot.js account.
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
                        <label>KSM to Lock Up:</label>
                        <Input
                          text='tel'
                          type='number'
                          min={0.1}
                          step='0.1'
                          value={amount}
                          state='amount'
                          placeholder='Enter KSM Amount'
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
                                children: 'Generate referral code',
                              }}
                              onClick={() => setToggleOne(!toggleOne)}
                            />
                            <div>
                              <br />
                              {toggleOne ? (
                                <Input
                                  required
                                  id='grc'
                                  type='email'
                                  pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                                  placeholder='Enter Email'
                                />
                              ) : null}
                            </div>
                            <br />
                          </Grid.Column>
                          <Grid.Column>
                            <Checkbox
                              checked={toggleTwo}
                              label={{
                                children: 'Enter referral code',
                              }}
                              onClick={() => setToggleTwo(!toggleTwo)}
                            />
                            <div>
                              <br />
                              {toggleTwo ? (
                                new URL(window.location.href).searchParams.get(
                                  'ref'
                                ) ? (
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
                                ) : (
                                  <Input
                                    required
                                    id='erc'
                                    type='text'
                                    placeholder='Enter Referral Code'
                                  />
                                )
                              ) : null}
                            </div>
                            <br />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

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
                            amount * Math.pow(10, 12),
                            null,
                          ],
                          paramFields: [true, true, false],
                          disableButton: disableButton,
                        }}
                      />
                    </form>
                    <div className={'polkadot_status'}>{status}</div>
                  </div>

                  {/* <div>
                <h2>Through an Exchange</h2>
                <p>
                  If you hold KSM on a crypto exchange, it may provide
                  functionality to participate in Kusama crowdloans from your
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

                    <EmbedVideo style={{width:'100%'}} />
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
                      Choose the Kusama Network
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
                </Slider>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
