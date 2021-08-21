import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import C1 from './Images/investor-logo/2.png';
import C2 from './Images/investor-logo/1.png';
import C3 from './Images/investor-logo/6.png';
import C4 from './Images/investor-logo/3.png';
import C5 from './Images/investor-logo/4.png';
import C6 from './Images/investor-logo/5.png';
import I1 from './Images/investor-logo/other/1.png'
import I2 from './Images/investor-logo/other/2.png'
import I3 from './Images/investor-logo/other/3.png'
import I4 from './Images/investor-logo/other/4.png'
import I5 from './Images/investor-logo/other/5.png'
import I6 from './Images/investor-logo/other/6.png'
import I7 from './Images/investor-logo/other/7.png'
import I8 from './Images/investor-logo/other/8.png'
import I9 from './Images/investor-logo/other/9.png'
import I10 from './Images/investor-logo/other/10.png'
import I11 from './Images/investor-logo/other/11.png'
import I12 from './Images/investor-logo/other/12.png'

export default function Clients (props) {
  return (
    <div className="white-bg-2 clients">
      <Container>
        <div className="text">
          <span>OUR COLLABORATORS</span>
          <div className="image-holder">
            <img src={C1} />
          </div>
          <div className="image-holder">
            <img src={C2} />
          </div>
          <div className="image-holder">
            <img src={C3} />
          </div>
          <div className="image-holder">
            <img src={C4} />
          </div>
          <div className="image-holder">
            <img src={C5} />
          </div>
          <div className="image-holder">
            <img src={C6} />
          </div>
        </div>
        <div className="text">
          <span>OUR INVESTORS</span>
          <div className="image-holder">
            <img src={I1} />
          </div>
          <div className="image-holder">
            <img src={I11} />
          </div>
          <div className="image-holder">
            <img src={I2} />
          </div>
          <div className="image-holder">
            <img src={I3} />
          </div>
          <div className="image-holder">
            <img src={I4} />
          </div>
          <div className="image-holder">
            <img src={I12} />
          </div>
          <div className="image-holder">
            <img src={I5} />
          </div>
          <div className="image-holder">
            <img src={I6} />
          </div>
          <div className="image-holder">
            <img src={I7} />
          </div>
          <div className="image-holder">
            <img src={I8} />
          </div>
          <div className="image-holder">
            <img src={I10} />
          </div>
          <div className="image-holder">
            <img src={I9} />
          </div>
        </div>
      </Container>
    </div>
  );
}
