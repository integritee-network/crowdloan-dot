import './css/App.css';
import { Container, Button, Grid } from 'semantic-ui-react';
import icon0 from './Images/i0.svg';
import icon1 from './Images/i1.svg';
import icon2 from './Images/i2.svg';
import icon3 from './Images/i3.svg';

export default function Participate () {
  return (
        <div className="roadmap">
            <Container>
                <div className="text">
                    <h1>Integritee’s <br /> Roadmap</h1>
                </div>
                <div className="timeline">
                    <div><ul>
                      <li>Encointer whitepaper release, sketching a privacy solution with TEEs.</li>
                        <li>Beginning of the SubstraTEE journey.</li>
                    </ul> <span>2018</span></div>
                    <div>
                    <ul>
                          <li>First public demonstration of private off-chain execution.</li>
                          <li>Secured Web3 grants to develop SubstraTEE using Intel SGX, and Substrate Rust API client.</li>
                    </ul>
                    <span>2019</span>
                    </div>
                    <div>
                    <ul>
                        <li>Q1 <br /> Web3 grant for SubstraTEE extension pack.</li>
                        <li>Q2-Q4 <br /> Developed prototype platform &amp; deployed first use case: Encointer.</li>
                        <li>Q4 <br /> Secured Polkadot Treasury grant for “SubstraTEE scalability”.</li>
                    </ul>
                    <span>2020</span>
                    </div>
                    <div>
                    <ul>
                        <li>Q1-Q2 <br /> Closed seed round &amp; deployed Rococo testnet parachain.</li>
                        {/* <li>Q2 <br /> Closed seed round.</li> */}
                        <li>Q3 <br /> Released Token Paper.</li>
                        <li>Secure Kusama slot(s).</li>
                        <li>Launch main-net, TEER token and sidechains.</li>
                        <li>Q4 <br /> Secure Polkadot slot(s).</li>
                        <li>List TEER on major exchange &amp; release Kusama-Polkadot bridge.</li>
                        
                    </ul>
                    <span>2021</span>
                    </div>
                    <div>
                    <ul>
                        <li>Deploy first enterprise PoCs.</li>
                        <li>Decentralize and establish the Governance Council.</li>
                        <li>Establish a multi-environment TEER token.</li>
                        <li>Implement fee burning and lockdrop mechanisms.</li>
                        <li>Forge partnerships with international institutions and universities.</li>
                        <li>Issue Treasury grants to expand the Integritee ecosystem and community.</li>
                        <li className="active">Establish Integritee as the leading Polkadot privacy solution.</li>
                    </ul>
                    <span>2022 and beyond</span>
                    </div>
                </div>

            </Container>
        </div>
  );
}
