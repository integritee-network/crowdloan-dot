import React, { useState, useEffect } from "react";
import "./css/App.css";
import { Container, Button, Grid } from "semantic-ui-react";
import icon0 from "./Images/i0.svg";
import icon1 from "./Images/i1.svg";
import icon2 from "./Images/i2.svg";
import icon3 from "./Images/i3.svg";
import icon4 from "./Images/polkadot.png";
import Slider from "react-slick";
import { setActiveLink } from "react-scroll/modules/mixins/scroller";

import { Form, Input } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import { useSubstrate } from './substrate-lib';
import AccountSelector from "./AccountSelector";

export default function Participate (props) {

  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  // const { accountPair } = props;
  const [disableButton, setDisableButton] = useState(true);
  const [crowdLoanEnded, setCrowdLoanEnded] = useState(false)
  const { api } = useSubstrate();
  const [blockNumber, setBlockNumber] = useState(0);
  const [crowdLoanData, setCrowdLoanData] = useState({});
  const { amount } = formState;
  const paraId = '2015';

  const bestNumber = api.derive.chain.bestNumber;


  const [accountAddress, setAccountAddress] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestNumber]);

  const { apiState, keyring, keyringState, apiError } = useSubstrate();
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  //disable contribution if crowdfunding has already ended: Enable this codeblock when going live
  // useEffect(() => {
  //   if (blockNumber >= crowdLoanData.end && blockNumber > 0 && crowdLoanData && Object.keys(crowdLoanData).length !== 0) {
  //     setDisableButton(true);
  //     setCrowdLoanEnded(true)
  //     setStatus('crowdloan has ended');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [blockNumber]);

  useEffect(() => {
    const queryResHandler = result => {
      setCrowdLoanData(result.toJSON());
    };
    const crowdLoan = async () => {
      await api.query.crowdloan.funds(['2015'], queryResHandler);
    };
    crowdLoan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (_, data) => {
    setFormState(prev => ({ ...prev, [data.state]: data.value }));
    if (!crowdLoanEnded) {
      if (data.value === '' || data.value <= 0 || data.value < 0.1) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    }
  };

  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
    let slider1 = []
    let slider2 = []

    useEffect(() => {
      setNav1(slider1)
      setNav2(slider2)
  }, [slider1, slider2])
  const settings = {
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (

    <div className="participatesection">


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

<div className="participate" id="participate">
      <Container>
        <div className="text">
          <span>2 WAYS TO TAKE PART</span>
          <h1>Participate in the Integritee Crowdloan!</h1>
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5} className="participate-tabs">
              <Slider
                {...settings}
                className="left-slider"
                asNavFor={nav1}
                ref={slider => (slider2 = slider)}
                slidesToShow={3}
                vertical="true"
                swipeToSlide={true}
                focusOnSelect={true}
              >
                <div>
                  <div className="main">
                    <div class="onthissiteicon">
                      <span>ON THIS SITE</span>
                      <div className="image-holder">
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
                  <div className="main">
                    <div>
                      <span>USING POLKADOT-JS APPS</span>
                      <div className="image-holder">
                        <img src={icon4} />
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </Grid.Column>
            <Grid.Column className="right-section" width={10}>
              <Slider {...settings} asNavFor={nav2} ref={slider => (slider1 = slider)}>
                <div>
                  <h2>On this site</h2>
                  <ol>
                    <li>
                      Download the Polkadot Browser extension for Chrome/Firefox{" "}
                      <a href="https://polkadot.js.org/extension/">here</a>.
                    </li>
                    <li>
                      Ensure that you have&nbsp;
                      <a href="https://guide.kusama.network/docs/maintain-guides-how-to-unbond/">
                         unbonded</a> KSM in your Polkadot.js account.
                    </li>
                  </ol>

                  <AccountSelector className="accounts-section" setAccountAddress={setAccountAddress} />

                  <div className={"polkadot_status"}>{status}</div>

                  <div className="form mb-5">
                    <div className="boxes">
                      <label>KSM to Lock Up:</label>
                      <Input
                        text="tel"
                        type="number"
                        min={0.1}
                        value={amount}
                        state='amount'
                        placeholder="Enter KSM Amount"
                        onChange={onChange} />
                    </div>
                  </div>
                  <br></br>
                  <TxButton
                    accountPair={accountPair}
                    label='Participate Now'
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
                  <ol>
                    <li>
                      Navigate to: <a href="https://polkadot.js.org/apps/">polkadot.js.org/apps/</a>.
                    </li>
                    <li>Follow the instructions detailed in this video:</li>
                  </ol>
                  <div className="video-box">
                    <div className="video-placeholder">
                      <iframe src="https://www.youtube.com/embed/YrTxDufrcQM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
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
