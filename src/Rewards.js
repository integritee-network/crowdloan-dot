import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
// import Graphimage from './Images/graph2.png';

export default function Rewards () {
  return (
        <div className="white-bg-2" id="TeerToken">
            <Container>
                <div className="text">
                    <Grid>
                        <Grid.Row columns={1}>
                        <Grid.Column>
                            <span>HOW WE ALLOCATE TEER</span>
                            <h2>Supporter Rewards</h2>
                            <p>
                              Integritee tokens will be distributed to KSM holders who support us in the Kusama parachain auctions.
                              The quantity of TEER you receive as a supporter is proportional to the amount of KSM you lock until
                              late December 2022. Each KSM will be rewarded with 20 TEER tokens until we until we hit 20,000 KSM.
                              Thereafter each KSM will be rewarded with 10 TEER.
                            </p>
                            <div className="main">
                            <div className="text">
                            <strong>TEER is listed now:</strong>
                            <p>
                              As our Token is <a href="https://www.gate.io/trade/TEER_USDT"> traded on an exchange </a>
                              you can now calculate the value of TEER rewards.
                            </p>
                            <strong>Decentralization:</strong>
                            <p>For TEER to serve its purpose as a means of exchange and
                              governance for the Integritee network, it must be circulated
                              widely. Our approach to supporter rewards guarantees that a
                              large number of tokens will be distributed.</p>
                            </div>
                            <div className="text">
                            <strong>As a fast mover supporter, you receive:</strong>
                            <div className="cal-box other">
                                1 KSM locked = 20 TEER + bonuses
                            </div>
                            </div>
                              <div className="text">
                                <strong>After reaching the threshold of 20,000 KSM raised:</strong>
                                <div className="cal-box other">
                                  1 KSM locked = 10 TEER + bonuses
                                </div>
                                <p>subject to linear vesting over 48 weeks</p>
                              </div>
                            </div>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
  );
}
