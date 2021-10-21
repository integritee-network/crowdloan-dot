import React from 'react';
import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
// import Otherimage from './Images/other-image.png';
import UserIcon from '../src/Images/user.png';
import IntegriteeIcon from '../src/Images/integritee-logo.png';
// import referralCodeGenerator from 'referral-code-generator';
// import { mnemonicGenerate } from '@polkadot/util-crypto';
export default function Referral (props) {
//   const mnemonic = mnemonicGenerate();
//   const [open, setOpen] = React.useState(false);
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
                            How it works: Spread the word about the Integritee crowdloan to your personal network. 
                            When somebody backs us using your referral code, they will receive a 5% bonus on 
                            their Supporter Reward. 
                            As a thank you for making the referral, you will also receive the same amount.
                            </p>
                            <p>
                            Let’s look at an example (on the right) of 
                            someone you refer who contributes KSM to the crowdloan - let’s call them John Doe.
                            </p>
                            <p>
                            If you’ve already participated in the crowdloan, you can generate a referral code now.
                            </p>
                            {/* <Modal size="mini" open={open} trigger={<Button className="ui primary gradient-btn button" onClick={() => setOpen(true)}>Generate Referral Code</Button>}>
                                <Modal.Header>Generate Referral Code</Modal.Header>
                                <Modal.Content scrolling>
                                <Modal.Description>
                                    <span>{mnemonic}</span>
                                    <Input fluid placeholder='email' value="" />
                                </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='black' onClick={() => setOpen(false)}>
                                        Close
                                    </Button>
                                    <Button
                                    onClick={() => setOpen(false)}
                                    content="Send"
                                    positive
                                    />
                                </Modal.Actions>
                            </Modal> */}

                            {/* <a style={{  marginLeft: '0px !important' }} className="ui primary gradient-btn button" href="#participate">Participate Now!</a> */}
                        </Grid.Column>
                        <Grid.Column>
                            <br></br>
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
                                    John Doe contributes 1,000 KSM to the crowdloan.
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
                                    Integritee wins the slot with 20,000 KSM. That means that John Doe has contributed 5% of the total KSM.
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
                                    John Doe will then receive 5% of the 1 million TEER tokens = 50,000 TEER.
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
                                    For using your referral link, both John Doe and you each get a 5% bonus from this amount, which is 5% of 50,000 TEER = 1,500 TEER each.
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
