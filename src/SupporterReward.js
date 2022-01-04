import React from 'react';
import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import backgroundimage1 from './Images/Guaranteed4_rotated.png';
export default function SupporterReward (props) {
  return (
        <div className="green-bg" id="Support" style={{
          backgroundImage: `url(${backgroundimage1})`,
          backgroundColor: '#eff3f6',
          backgroundSize: 'cover',
          backgroundPosition: '0px 35px',
          backgroundRepeat: 'no-repeat'
        }}>
            <Container id="Supportsection">
                <div className="text" >
                    <Grid>
                        <Grid.Row columns={3}>
                            <Grid.Column id="column1">
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
                            {/* <Grid.Column style={{ width: '28%' }}></Grid.Column> */}

                            <Grid.Column id="column2" >
                                <Grid.Row columns={1} >

                                    <Grid.Column id="mobilesupport" className="visibledesktopScenario1" style={{ bottom: '-12.188rem', position: 'absolute' }}>

                                        <div className="">
                                            <span style={{ color: '#000065' }} > Scenario 1: &lt; 10,000 KSM bonded</span>
                                            <span style={{ color: '#70e6da', fontSize: '15px' }} >10,000 TEER distributed to all contributors</span>

                                            If Integritee doesn’t win an auction and the crowdloan ends with
                                            less than 10,000 KSM bonded, 10,000 TEER will be distributed to
                                            all contributors.

                                        </div>

                                    </Grid.Column>

                                </Grid.Row>

                            </Grid.Column>

                            <Grid.Column id="column2" >
                                    <Grid.Row columns={1} >

                                        <Grid.Column id="mobilesupport" className="visibledesktopScenario2" style={{ bottom: '2rem', position: 'absolute' }}>

                                            <div className="">
                                                <span style={{ color: '#000065' }} >Scenario 2: ≥ 10,000 KSM bonded</span>
                                                <span style={{ color: '#70e6da', fontSize: '15px' }} >20,000 TEER distributed to all contributors</span>

                                                If Integritee doesn’t win an auction and the crowdloan ends
                                                with 10,000 KSM bonded or more, 20,000 TEER will be
                                                distributed to contributors.

                                            </div>

                                        </Grid.Column >

                                    </Grid.Row>

                            </Grid.Column>

                        </Grid.Row>
                    </Grid>

                </div>

            </Container>

        </div>

  );
}
