import './css/App.css';
import { Container, Menu } from 'semantic-ui-react';
import icon0 from './Images/i0.svg';
import mediumlogo from './Images/Medium-Logo.png';
import elementlogo from './Images/element.png';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrLinkedinOption } from 'react-icons/gr';
import { FaTelegramPlane } from 'react-icons/fa';


export default function Footer () {
  return (
        <div className="footer">
            <Menu
                tabular
                className="main-menu"
                >
                <Container>
                    <Menu.Menu className="logo">
                    <img src={icon0} width={200} />
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                    <Menu.Item
                        name='Home Page'
                        href="https://www.integritee.network"
                    />
                    <Menu.Item
                        name='Crowdloan Campaign'
                        href="#crowdloan"
                    />
                    <Menu.Item
                        name='TEER Token'
                        href="#TeerToken"
                    />
                    <Menu.Item
                        name='FAQ'
                        href="#FAQ"
                    />
                    </Menu.Menu>
                </Container>
                </Menu>

                <Container className="part-btn-holder">
              <a className="ui primary gradient-btn button" href="#participate">Participate Now!</a>
                </Container>
                <Container className="footer-bottom">
                    <div className="social">
                        <ul>
                            <li><a target="_blank" href="https://twitter.com/integri_t_e_e"><AiOutlineTwitter /> </a> </li>
                            <li> <a target="_blank" href="https://www.linkedin.com/company/integritee/"><GrLinkedinOption /> </a> </li>
                            <li><a target="_blank" href="https://t.me/Integritee_Official"><FaTelegramPlane/> </a> </li>
                            <li> <a target="_blank" href="https://medium.com/integritee"><img src={mediumlogo} width={20} /> </a> </li>
                            {/* <li> <a target="_blank" href="https://app.element.io/#/room/#integritee-watercooler:matrix.org"><img src={elementlogo} width={20} /> </a> </li> */}
                    
                        </ul>
                    </div>
                    <div className="bottom-nav">
                        <ul>
                            <li> <a  href="https://www.integritee.network/privacy-policy">Impressum</a> </li>
                            <li> <a  href="https://www.integritee.network/privacy-policy">Privacy Policy</a> </li>
                        </ul>
                    </div>
                </Container>
        </div>
  );
}
