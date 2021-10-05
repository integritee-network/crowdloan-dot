import React, { useState } from 'react';
import './css/App.css';
import { Container, Grid, Button, Modal, Input, Form } from 'semantic-ui-react';
import Otherimage from './Images/other-image.png';
import UserIcon from '../src/Images/user.png';
import IntegriteeIcon from '../src/Images/integritee-logo.png';
import referralCodeGenerator from 'referral-code-generator';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import backgroundimage from './Images/Guaranteed4.png';
export default function SupporterReward (props) {
  const mnemonic = mnemonicGenerate();
  const [open, setOpen] = React.useState(false);
  return (
        <div className="green-bg" id="Support" style={{
          backgroundImage: `url(${backgroundimage})`,
          backgroundColor: '#eff3f6',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}>
            <Container id="Supportsection">
                <div className="text" >
                    <Grid>
                        <Grid.Row columns={2}>

                        <Grid.Column id="column1" style={{ width: '70%!important' }}>
                            <Grid.Row columns={1} >
                            <span style={{ color: '#70e6da', fontSize: '15px' }} >SUPPORTER REWARDS</span>
                                    <h2>Guaranteed Rewards for <br/>Integritee Slot Auction Backers!</h2>
                                <Grid.Column id="column3" style={{ width: '50%!important' }}>

                                    <p>
                                    In addition, we are now offering further guaranteed bonus rewards for Integritee contributors,
                                    regardless of the outcome of the slot auctions.
                                    They will be distributed to crowdloan con- tributors relative to their
                                    opportunity cost — in terms of the amount of KSM they contribute,
                                    and the length of time this KSM is locked in.
                                    The locked-in time starts to be measured from the block
                                    that includes the contribution and finishes either when Integritee wins an auction,
                                    or Integritee’s crowdloan campaign ends, whichever happens first.

                                    <br/>  <br/>

                                    </p>

                                    <span style={{ color: '#000065' }} >Here’s how it works:</span>

                                </Grid.Column>
                            </Grid.Row>

                        </Grid.Column>

                        <Grid.Column id="column2" style={{ width: '30%!important' }}>
                            <Grid.Row columns={2} >
                                        <Grid.Column>
                                            <br/>
                                            <br></br>
                                        </Grid.Column>

                                        <Grid.Column style={{ bottom: '-5.188rem', position: 'absolute' }}>
                                        <ul className="" style={{ }}>

                              <li>

                                  <div className="">
                                  <span style={{ color: '#000065' }} >Scenario 2: ≥ 10,000 KSM bonded</span>
                                  <span style={{ color: '#70e6da', fontSize: '15px' }} >20,000 TEER distributed <br/>to all contributors </span>

                                  If the Integritee crowdloan reaches or exceeds 10,000
                                  KSM bonded, 20,000 TEER will be distributed to contributors, proportional to their contribution.
                                  </div>
                              </li>

                          </ul>
                                        </Grid.Column>

                            </Grid.Row>

                        </Grid.Column>

                        </Grid.Row>
                    </Grid>

                    <Grid columns={3}>
                    <Grid.Column style={{ width: '28%' }}></Grid.Column>
                    <Grid.Column >
                    <ul>
                    <div className="" >

                    <span style={{ color: '#000065' }} > Scenario 1: &lt; 10,000 KSM bonded</span>
                    <span style={{ color: '#70e6da', fontSize: '15px' }} >10,000 TEER distributed <br/>to all contributors</span>

                        If the Integritee crowdloan ends with less than 10,000
                        KSM bonded, 10,000 TEER will be distributed to all contributors, proportional to their contribution.
                    </div>
                    </ul>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                    </Grid>
                </div>

            </Container>

        </div>

  );
}
