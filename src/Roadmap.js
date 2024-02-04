import './css/App.css';
import { Container } from 'semantic-ui-react';
import Timeline from './Images/line.png';
// import icon0 from './Images/i0.svg';
// import icon1 from './Images/i1.svg';
// import icon2 from './Images/i2.svg';
// import icon3 from './Images/i3.svg';

export default function Participate () {
  return (
        <div className="roadmap">
            <Container>
                <div className="text">
                    <h1>Integritee’s Roadmap</h1>
                </div>
           
                <div className="timeline">
                    <div><ul>
                      <li>Encointer whitepaper release, sketching a privacy solution with TEEs.</li>
                      <li>Beginning of the SubstraTEE journey.</li>
                      <li>First public demonstration of private off-chain execution.</li>
                        <li>Secured Web3 grants to develop SubstraTEE using Intel SGX, and Substrate Rust API client.</li>
                    </ul> <span>2018-2019</span></div>
                    <div>
                    <ul>
                    <li>Web3 grant for SubstraTEE extension pack & secured Polkadot Treasury grant for “SubstraTEE scalability”.</li>
<li>Closed seed round & <br/>Series A</li>
<li>Released Tokenomics Paper.</li>
<li>Launch main-net and TEER token.</li>
<li>TEER on a major exchange.</li>
<li>Secured first Kusama slot.</li>

                    </ul>
                    <span>2020-2021</span>
                    </div>
                    <div>
                    <ul>
                        <li>Secured Polkadot Parachain Slot</li>
                        <li>Named 1 of 10 promising Swiss startups by EU Startups</li>
                        <li>Finals of eurobits ESCO Startup Award 2022</li>
                        <li>Finals of eurobits ESCO Startup Award 2022</li>
                        <li>XCM (messaging) integrations with Moonriver, Karura, Bifrost</li>
                        <li>First PoCs completed</li>
                    </ul>
                    <span>2022 </span>
                    </div>
                    <div>
                    <ul>
                        <li>Launch of Securitee Confidential Computing infrastructure product</li>
                        {/* <li>Q2 <br /> Closed seed round.</li> */}
                        <li>Release of Oracle framework</li>
                        <li>SDK improvements & first enterprise developing on Integritee</li>
                        <li>Release of Attesteer service</li>
                        <li>Release of Whitepaper with OVH & Intel</li>
                        <li>Tech4Trust Accelerator Acceptance</li>
                        <li>Incognitee Testnet Launch</li>
                        <li>Hackernoon Startup Award winner in Zurich</li>

                    </ul>
                    <span>2023</span>
                    </div>
                    <div>
                    <ul>
                        <li>Release of Whitepaper with OLI Systems</li>
                        <li>First live project(s) on network</li>
                        <li>Launch treasury grant program </li>
                        <li>DEX Listing </li>
                        <li>Incognitee Mainnet Launch</li>
                        <li>Release of Sidechain as a Service on Securitee</li>
                        <li>Bridge Integritee Kusama to Integritee Polkadot</li>
                        <li>Bridge to other Ecosystems</li>
                        <li>Release Sidechain SDK<br/> v 1.0.0</li>
                    </ul>
                    <span>2024 and beyond</span>
                    </div>
                </div>

            </Container>
        </div>
  );
}
