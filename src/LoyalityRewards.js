import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import LoyalityImage from './Images/Loyalty Rewards.png';

export default function LoyalityRewards (props) {
  return (
        <div className="white-bg">
            <Container>
                <div className="text" id="loyality">
                    <Grid>
                        <Grid.Row columns={2}>
                        <Grid.Column>
                            <span>LOYALTY REWARDS</span>
                            <h2 style={{ fontSize: '38px' }}>Support Integritee Again & Receive a 10% Bonus Reward</h2>
                            <p>
                                We are proud of the tremendous support we have received from
                                backers globally in the previous batches of Kusama auctions.
                            </p>

                            <p>
                                As a mark of our appreciation for your continued support, anyone
                                who backed us in our previous crowdloan campaigns will receive a 10%
                                bonus on their Supporter Reward for any new contribution up to the
                                maximum amount they contributed previously.
                            </p>

                        </Grid.Column>
                        <Grid.Column>
                            <div className="LoyalityImage" style={{ textAlign: 'center' }}>
                                <img style={{ maxWidth: '50%', marginTop: '30px' }} src={LoyalityImage} alt="" />
                            </div>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
  );
}
