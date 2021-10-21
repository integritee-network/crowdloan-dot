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
                            <h2 style={{fontSize:'38px'}}>Support Integritee Again & Receive a 10% Bonus Reward</h2>
                            <p>
                            We are proud of the tremendous support 
                            we have received from backers globally in the second batch of Kusama auctions.
                            </p>
              

                            <p>
                            As a mark of our appreciation for your continued support, if you backed us in the previous slot auctions (Slot 7 - 11), you will be eligible for a 10% Loyalty Reward on any new contribution up to the amount you contributed last time. 
                            The 10% Loyalty Reward will be added to your Supporter Reward for your new contribution.
                            </p>
                           


                        </Grid.Column>
                        <Grid.Column>
                            <div className="LoyalityImage" style={{textAlign:'center'}}>
                                <img style={{maxWidth:'50%', marginTop:'30px'}} src={LoyalityImage} alt="" />
                            </div>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
  );
}
