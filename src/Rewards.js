import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import Graphimage from './Images/graph2.png';

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
                            10% of the total Integritee token allocation will be fairly distributed to KSM holders who support us in the Kusama parachain auctions. The quantity of
TEER each supporter receives will thereby depend on the amount of KSM they lock-in, relative to the total amount locked-in by all supporters. This
approach has two benefits:
                            </p>
                            <div className="main">
                            <div className="text">
                            <strong>Community-driven token value:</strong>
                            <p>
                            Rather than setting an arbitrary value for TEER before it is in
circulation, we are letting the community set an appropriate
value for the token. This enables market forces to be used as
a price discovery mechanism before the token is traded on
exchanges.
                            </p>
                            <strong>Decentralization:</strong>
                            <p>For TEER to serve its purpose as a means of exchange and
governance for the Integritee network, it must be circulated
widely. Our approach to supporter rewards guarantees that a
fixed number of tokens will be distributed, regardless of the
size of the winning bid(s).</p>
                            </div>
                            <div className="text">
                            <strong>Total Rewards:</strong>
                            <div className="cal-box center">
                            1,000,000 TEER
                            <small>(10% of total token allocation)</small>
                            </div>
                            <strong>As a supporter, you receive:</strong>
                            <div className="cal-box other">
                                <div>
                                    <div className="border-b">Your KSM contribution</div>
                                    <div>Total KSM contribution</div>
                                </div>
                                <div>x  1,000,000</div>
                            </div>
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
