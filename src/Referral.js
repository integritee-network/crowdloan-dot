import React from 'react';
import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import UserIcon from '../src/Images/user.png';
import IntegriteeIcon from '../src/Images/integritee-logo.png';
import { useGlobalState } from './state';

export default function Referral (props) {
  const [crowdLoanRunning] = useGlobalState('crowdLoanRunning');
  return (
        <div className="green-bg" id="referral">
            <Container>
                <div className="text">
                    <Grid>
                        <Grid.Row columns={2}>
                        <Grid.Column>
                            <span>REFERRAL PROGRAM</span>
                            <h2>Tell Your Network About Integritee & Get a 5% Referral Reward</h2>
                            <p>
                            The Integritee Crowdloan Referral Program allows you to leverage the power of
                            your personal network and gain additional rewards for both yourself
                            and the people you refer, so everybody wins.

                            </p>
                            <p>
                            How it works: Make a contribution of at least 0.1 KSM to our crowdloan and generate a referral code. Spread the word about the Integritee crowdloan to your personal network.
                            When somebody backs us using your referral code, they will receive a 5% bonus on
                            their Supporter Reward.
                            As a thank you for making the referral, you will also receive the same amount.
                            </p>

                            <p>
                            If you have backed Integritee before and contribute again, you can use the same referral link as last time.
                            </p>

                            <br />

                            {crowdLoanRunning &&
                            <a className='ui primary gradient-btn button' style={{ lineHeight: '1.5' }} href='#participate' >
                                Participate Now!
                            </a>
                            }
                            {!crowdLoanRunning &&
                            <a className="ui primary gradient-btn button" style={{ lineHeight: '1.5' }} href="https://mailchi.mp/integritee/get-notified">Get Notified!</a>
                            }
                        </Grid.Column>
                        <Grid.Column>
                            <br/>
                            <br/>
                            <p>
                            Let’s look at an example of
                            someone you refer who contributes KSM to the crowdloan - let’s call them John Doe.
                            </p>
                            <br></br>
                            <ul className="process">
                                <li>
                                    <div className="icon-holder">
                                        <div className="icon">
                                            <img src={UserIcon} alt="Icon" />
                                        </div>
                                        You
                                    </div>
                                    <div className="text-holder">
                                    You refer John Doe by sending him your referral link.

                                    </div>
                                </li>
                                <li>
                                    <div className="icon-holder">
                                        <div className="icon">
                                            <img src={UserIcon} alt="Icon" />
                                        </div>
                                        John Doe
                                    </div>
                                    <div className="text-holder">
                                    John Doe contributes 250 KSM to the crowdloan.
                                    </div>
                                </li>
                                <li>
                                    <div className="icon-holder">
                                        <div className="icon integritee">
                                            <img src={IntegriteeIcon} alt="Icon" />
                                        </div>
                                        Integritee
                                    </div>
                                    <div className="text-holder">
                                    Integritee wins the slot
                                    </div>
                                </li>
                                <li>
                                    <div className="icon-holder">
                                        <div className="icon">
                                            <img src={UserIcon} alt="Icon" />
                                        </div>
                                        John Doe
                                    </div>
                                    <div className="text-holder">
                                        John Doe will then receive
                                        10,000 TEER.
                                    </div>
                                </li>
                                <li>
                                    <div className="icon-holder">
                                        <div>
                                            <div className="icon">
                                                <img src={UserIcon} alt="Icon" />
                                            </div>
                                            You
                                        </div>
                                        <div>
                                            <div className="icon">
                                                <img src={UserIcon} alt="Icon" />
                                            </div>
                                            John Doe
                                        </div>
                                    </div>
                                    <div className="text-holder">
                                        For using your referral link, both John Doe
                                        and you each get a 5% bonus from this
                                        amount, which is 5% of 10,000 TEER = 500
                                        TEER each.
                                    </div>
                                </li>
                            </ul>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
  );
}
