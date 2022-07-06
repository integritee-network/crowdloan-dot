import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import Otherimage from './Images/other-image.png';

export default function How (props) {
  return (
        <div className="white-bg">
            <Container>
                <div className="text">
                    <Grid>
                        <Grid.Row columns={2}>
                        <Grid.Column>
                            <span>HOW PARACHAIN AUCTIONS WORK</span>
                            <h2>The Integritee Polkadot <br />Crowdloan Explained</h2>
                            <p>
                            One of the biggest advantages of Polkadot is that it enables many
                            decentralized networks to achieve strength in numbers by pooling
                            security resources. Integritee plans to use the shared security and
                            public auditability of Polkadot to power our privacy-preserving data
                            services.
                            </p>
                            <div className="childnew">
                                <a href="https://polkadot.network/parachains/#contribute">

                                How to contribute

                                    </a>
                            </div>

                            <p>
                            Polkadot parachains are leased in slots to the projects which provide the largest
                            bond in the form of locked-in DOT. Backers can support their favourite projects by locking in DOT for the duration of the lease period.
                            The reason it is called a “crowdloan” is that backers retain full access
                            to their DOT once the lease period ends.
                            </p>
                            <div className="childnew">
                                <a href="https://wiki.polkadot.network/docs/learn-crowdloans">

                                Learn more about crowdloans

                                    </a>
                            </div>

                            <p>
                            Integritee will begin bidding to secure its first Polkadot parachain.
                            We will be rewarding DOT holders who support Integritee bids with TEER.
                            </p>
                            <div className="childnew">
                                <a href="https://wiki.polkadot.network/docs/learn-auction">

                              Learn more about the auction

                                    </a>
                            </div>
                            {/* <div className="child">
                                <a href="https://wiki.polkadot.network/docs/learn-crowdloans">
                                <Button className="ui primary gradient-btn button">
                                Learn more about crowdloans
                                    </Button>
                                    </a>
                            </div> */}

                        </Grid.Column>
                        <Grid.Column>
                            <div className="image howparachain">
                                <img src={Otherimage} alt="" />
                            </div>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
  );
}
