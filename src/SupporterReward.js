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
          backgroundPosition: '0px -85px',
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
                                    Even in the event that Integritee does not win an auction, 
                                    our backers will receive Guaranteed TEER Token Rewards after the end of the campaign.
                                    </p>

                                    <p>
                                    The more KSM bonded by our supporters during the auction, the more 
                                    TEER that will be distributed to backers when it ends if we don’t win.

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
                                        <ul className="" style={{ listStyleType: 'none' }}>

                              <li>

                                  <div className="">
                                  <span style={{ color: '#000065' }} >Scenario 2: ≥ 40,000 KSM bonded</span>
                                  <span style={{ color: '#70e6da', fontSize: '15px' }} >40,000 TEER distributed to all contributors</span>

                                  If Integritee doesn’t win an auction and the crowdloan campaign ends with 40,000 KSM bonded 
                                  or more, 40,000 TEER will be distributed to contributors, proportional to their contribution.
                                  
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

                    If Integritee doesn’t win an auction and the crowdloan campaign ends with 20,000 KSM bonded 
                    or more, 20,000 TEER will be distributed to all contributors, proportional to their contribution.
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
