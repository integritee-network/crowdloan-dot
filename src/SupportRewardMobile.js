import React from 'react';
import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
// import Otherimage from './Images/other-image.png';
// import UserIcon from '../src/Images/user.png';
// import IntegriteeIcon from '../src/Images/integritee-logo.png';
// import referralCodeGenerator from 'referral-code-generator';
// import { mnemonicGenerate } from '@polkadot/util-crypto';
// import backgroundimage from './Images/Guaranteed4.png';
export default function SupportRewardMobile (props) {
//   const mnemonic = mnemonicGenerate();
//   const [open, setOpen] = React.useState(false);
  return (
        <div className="green-bg" id="SupportMobile" style={{ backgroundColor: '#eff3f6' }}>
            <Container id="Supportsection">
                <div className="text" >
                    <Grid>
                        <Grid.Row columns={1}>

                        <Grid.Column id="" style={{ width: '' }}>
                            <Grid.Row columns={1} >
                            <span style={{ color: '#70e6da', fontSize: '15px' }} >GUARANTEED REWARDS</span>
                                    <h2 style={{ fontSize: '2rem' }} >With Guaranteed Rewards, Our Backers Can’t Lose</h2>
                                <Grid.Column id="" >

                                <p>
                                    In addition, we are now offering further guaranteed bonus rewards for Integritee contributors, 
                                    regardless of the outcome of the slot auctions. They will be distributed to crowdloan contributors relative 
                                    to their opportunity cost in terms of the amount of KSM they contribute, 
                                    and the length of time this KSM is locked in. The locked-in time starts to be measured from the 
                                    block that includes the contribution and finishes with the last block of the crowdloan campaign.
                                   

                                    </p>
                                    <span style={{ color: '#000065' }} >Here’s how it works:</span>

                                </Grid.Column>

                                <Grid.Row columns={2} >
                                <Grid.Column id="1" >
                                <ul>
                    <div className="" >

                    <span style={{ color: '#000065' }} > Scenario 1: ≥ 20,000 KSM bonded</span>
                    <span style={{ color: '#70e6da', fontSize: '15px' }} >20,000 TEER distributed to all contributors</span>
                    If Integritee doesn’t win an auction and the crowdloan campaign ends with 20,000 KSM bonded or 
                    more, 20,000 TEER will be distributed to all contributors, proportional to their contribution.
                    </div>
                    </ul>

                                    </Grid.Column>
                                    <Grid.Column id="2" >
                                    <ul className="" style={{ listStyleType: 'none' }}>

                              <li>

                                  <div className="">
                                  <span style={{ color: '#000065' }} >Scenario 2: ≥ 40,000 KSM bonded</span>
                                  <span style={{ color: '#70e6da', fontSize: '15px' }} >40,000 TEER distributed to all contributors</span>

                                  If Integritee doesn’t win an auction and the crowdloan campaign ends with 40,000 KSM bonded or more, 
                                  40,000 TEER will be distributed to contributors, proportional to their contribution.
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
