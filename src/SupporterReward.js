import React from 'react';
import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
// import Otherimage from './Images/other-image.png';
// import UserIcon from '../src/Images/user.png';
// import IntegriteeIcon from '../src/Images/integritee-logo.png';
// import referralCodeGenerator from 'referral-code-generator';
// import { mnemonicGenerate } from '@polkadot/util-crypto';
import backgroundimage from './Images/Guaranteed4.png';
export default function SupporterReward (props) {
//   const mnemonic = mnemonicGenerate();
//   const [open, setOpen] = React.useState(false);
  return (
        <div className="green-bg" id="Support" style={{
          backgroundImage: `url(${backgroundimage})`,
          backgroundColor: '#eff3f6',
          backgroundSize: 'cover',
          backgroundPosition: '0px -105px',
          backgroundRepeat: 'no-repeat'
        }}>
            <Container id="Supportsection">
                <div className="text" >
                    <Grid>
                        <Grid.Row columns={2}>

                        <Grid.Column id="column1" style={{ width: '70%!important' }}>
                            <Grid.Row columns={1} >
                            <span style={{ color: '#70e6da', fontSize: '15px' }} >GUARANTEED REWARDS</span>
                                    <h2>With Guaranteed Rewards, <br/>Our Backers Can’t Lose</h2>
                                <Grid.Column id="column3" style={{ width: '50%!important' }}>

                                    <p>
                                    In addition, we are now offering further guaranteed bonus rewards for Integritee contributors, 
                                    regardless of the outcome of the slot auctions. They will be distributed to crowdloan contributors relative 
                                    to their opportunity cost in terms of the amount of KSM they contribute, 
                                    and the length of time this KSM is locked in. The locked-in time starts to be measured from the 
                                    block that includes the contribution and finishes with the last block of the crowdloan campaign.
                                   

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
                                        <ul className="" style={{ listStyleType: 'none' }}>

                              <li>

                                  <div className="">
                                  <span style={{ color: '#000065' }} >Scenario 2: ≥ 40,000 KSM bonded</span>
                                  <span style={{ color: '#70e6da', fontSize: '15px' }} >40,000 TEER distributed to all contributors</span>

                                  If Integritee doesn’t win an auction and the crowdloan ends
                                    with 40,000 KSM bonded or more, 40,000 TEER will be
                                    distributed to contributors.
                                  
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

                    {/* <span style={{ color: '#000065' }} > Scenario 1: &lt; 10,000 KSM bonded</span> */}
                    <br/>
                    <span style={{ color: '#000065' }} > Scenario 1: ≥ 20,000 KSM bonded</span>
                    <span style={{ color: '#70e6da', fontSize: '15px' }} >20,000 TEER distributed to all contributors</span>

                    If Integritee doesn’t win an auction and the crowdloan ends with
                    20,000 KSM bonded or more, 20,000 TEER will be distributed to
                    all contributors.
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
