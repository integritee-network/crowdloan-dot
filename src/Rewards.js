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
                            Integritee tokens will be distributed to DOT holders who support us in the Polkadot parachain
auctions. The quantity of TEER you receive as a supporter is proportional to the amount of DOT
you lock until Feb 13, 2026. Each DOT will be rewarded with 2.5 TEER tokens. No more than
100,000 DOT can be contributed.
                            </p>
                            <div className="main">
                            <div className="text">
                            <strong>TEER is listed now:</strong>
                            <p>
                              As our Token is
                              traded on several exchanges
                              you can now calculate the value of TEER rewards.
                            </p>
                            <strong>Decentralization:</strong>
                            <p>For TEER to serve its purpose as a means of exchange and
                              governance for the Integritee network, it must be circulated
                              widely. Our approach to supporter rewards guarantees that a
                              large number of tokens will be distributed.</p>
                            </div>
                            <div className="text">
                            <strong>As a supporter you receive:</strong>
                            <div className="cal-box other">
                                1 DOT locked = 2.5 TEER + bonuses
                            </div>
                            <p>subject to linear vesting over 96 weeks</p>
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
