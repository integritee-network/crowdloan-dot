import React, { useState } from 'react';
import './css/App.css';
import { Container, Grid, Button, Modal, Input, Form } from 'semantic-ui-react';
import Otherimage from './Images/other-image.png';
import UserIcon from '../src/Images/user.png';
import IntegriteeIcon from '../src/Images/integritee-logo.png';
import referralCodeGenerator from 'referral-code-generator';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import backgroundimage from './Images/Guaranteed4.png';
export default function SupportRewardMobile (props) {
  const mnemonic = mnemonicGenerate();
  const [open, setOpen] = React.useState(false);
  return (
        <div className="green-bg" id="SupportMobile" style={{ backgroundColor: '#eff3f6' }}>
            <Container id="Supportsection">
                <div className="text" >
                    <Grid>
                        <Grid.Row columns={1}>

                        <Grid.Column id="" style={{ width: '' }}>
                            <Grid.Row columns={1} >
                            <span style={{ color: '#70e6da', fontSize: '15px' }} >SUPPORTER REWARDS</span>
                                    <h2 style={{ fontSize: '2rem' }} >Guaranteed Rewards for <br/>Integritee Slot Auction Backers!</h2>
                                <Grid.Column id="" >

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

                                <Grid.Row columns={2} >
                                <Grid.Column id="1" >
                                <ul>
                    <div className="" >

                    <span style={{ color: '#000065' }} > Scenario 1: &lt; 10,000 KSM bonded</span>
                    <span style={{ color: '#70e6da', fontSize: '15px' }} >10,000 TEER distributed <br/>to all contributors</span>

                        If the Integritee crowdloan ends with less than 10,000
                        KSM bonded, 10,000 TEER will be distributed to all contributors, proportional to their contribution.
                    </div>
                    </ul>

                                    </Grid.Column>
                                    <Grid.Column id="2" >
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

                            </Grid.Row>

                        </Grid.Column>

                        </Grid.Row>
                    </Grid>

                </div>

            </Container>

        </div>

  );
}
