import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import OneImage from './Images/1.png';
import TwoImage from './Images/2.png';
import ThreeImage from './Images/3.png';

export default function ThreeBox (props) {
  return (
    <div className="grey-bg" id="crowdloan">
      <Container>
        <div className="text">
          <span>WHY INTEGRITEE?</span>
          <h2>
            Powering data-driven <br /> services where privacy comes as standard
          </h2>
          {/* <p className="main-para">
            Integritee enables firms and developers to build broader, fairer,
            and more secure data platforms. It is a hardware-enabled
            confidential computing solution that provides a trustworthy and
            adaptable alternative to centralized data-driven products and
            services
          </p> */}
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <div className="box">
                  <div className="icon">
                    <img src={OneImage} alt="" />
                  </div>
                  <h3>Trustworthy</h3>
                  <p>
                    Firms or consumers can process data in pre-agreed ways
                    through open-source code, without anyone having access to
                    the underlying dataset. The integrity of such computations
                    is publicly auditable. This aids compliance with privacy
                    laws like GDPR and fosters consumer trust.
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="box">
                  <div className="icon">
                    <img src={TwoImage} alt="" />
                  </div>
                  <h3>Interoperable</h3>
                  <p>
                    Integritee is not just interoperable with all other projects
                    on the Polkadot network, it can interface with any
                    light-client capable blockchain or web2 API.
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="box">
                  <div className="icon">
                    <img src={ThreeImage} alt="" />
                  </div>
                  <h3>Easy To Adopt</h3>
                  <p>
                    Integritee can be easily adopted by both blockchain
                    developers and enterprise clients. Third-party developers
                    gain access to a highly interoperable Polkadot sidechain,
                    while enterprise clients benefit from familiar processes,
                    documentation and billing procedures.
                  </p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
