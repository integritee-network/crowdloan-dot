import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import Graphimage from './Images/graph2.png';

export default function How (props) {
  return (
        <div className="grey-bg-2">
            <Container>
                <div className="text">
                    <Grid>
                        <Grid.Row columns={1}>
                        <Grid.Column>
                            <span>TOKENOMICS</span>
                            <h2>The Value of the <br />TEER Token</h2>
                            <p>
                                  The TEER token will be the fuel that drives the Integritee platform — a common means for platform access across all our Kusama and Polkadot parachains.
                            </p>
                            <p>
                                  Integritee adopters will require TEER to pay for our privacy-preserving data services. Given the growing consumer and regulatory pressure to protect user
                                  privacy, technologies like Integritee are rapidly becoming essential for firms. Thus, TEER has an intrinsic value which will be directly linked to demand
                                  for Integritee’s services.
                            </p>
                            <div className="main">
                            <div className="text">
                            <strong>Token Burn Mechanism: </strong>
                            <p>
                            A portion of the fees paid to the treasury for each transaction will
                            be burned. This will have a deflationary effect, reducing the
                            supply and thereby driving growth in the value of TEER, other
                            factors being equal.
                            </p>
                            <strong>Lockdrop Mechanism:</strong>
                            <p>Third-party developers can use our scalable, second-layer side
                            chains to host their projects. Integritee will offer proportional discounts in fees to projects which lock in TEER on the Integritee
                            parachain. This will slow down token velocity, further stimulating
                            token value.</p>
                            </div>
                            <div className="image">
                            <img src={Graphimage} alt="" />
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
