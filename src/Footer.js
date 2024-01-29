import './css/App.css';
import { Container, Menu } from 'semantic-ui-react';
import icon0 from './Images/i0.svg';
import mediumlogo from './Images/Medium-Logo.png';
import subsociallogo from './Images/subsocial-20x20px white.png';
import elementlogo from './Images/element_20x20px white.png';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrLinkedinOption } from 'react-icons/gr';
import { FaTelegramPlane } from 'react-icons/fa';
import discordl from './Images/Discord-20x20px WHITE-01.png';
import { useGlobalState } from './state';

export default function Footer () {
  const [crowdLoanRunning] = useGlobalState('crowdLoanRunning');

  return (
        <div className="footer">
            <Menu
                tabular
                className="main-menu"
                >
                <Container>
                    <Menu.Menu className="logo">
                    <img src={icon0} alt='icon' width={200} />
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                    <Menu.Item
                        name='Home Page'
                        href="https://www.integritee.network"
                    />
                    <Menu.Item
                          name='Help Center'
                          href="https://integritee.zendesk.com/hc/en-us"
                    />
                    <Menu.Item name='Supporter Reward' href='#TeerToken' />

                    {/* <Menu.Item name='Referral Program' href='#referral' /> */}

                    <Menu.Item name='TEER Token' href='#token' />

                    <Menu.Item name='FAQ' href='#FAQ' />
                    </Menu.Menu>
                </Container>
                </Menu>

                <Container className="part-btn-holder">
                {crowdLoanRunning &&
                <a className='ui primary gradient-btn button' href='#participate' >
                    Participate Now!
                </a>
                }
                {!crowdLoanRunning &&
                <a className="ui primary gradient-btn button" style={{ lineHeight: '1.5' }} href="https://mailchi.mp/integritee/get-notified">Get Notified!</a>
                }
                </Container>

                <Container className="footer-bottom">
                    <div className="social">
                        <ul style={{ listStyleType: 'none' }}>

                        <li> <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/company/integritee/"><GrLinkedinOption /> </a> </li>
                        <li><a rel="noreferrer" target="_blank" href="https://t.me/Integritee_Official"><FaTelegramPlane/> </a> </li>
                        <li><a rel="noreferrer" target="_blank" href="https://twitter.com/integri_t_e_e"><AiOutlineTwitter /> </a> </li>
                        <li> <a rel="noreferrer" target="_blank" href="https://app.element.io/#/room/#integritee-watercooler:matrix.org"><img src={elementlogo} width={20} alt="icon" /> </a> </li>
                        <li> <a rel="noreferrer" target="_blank" href="https://app.subsocial.network/4638"><img src={subsociallogo} width={20} alt="icon" /> </a> </li>
                        <li> <a rel="noreferrer" target="_blank" href="https://medium.com/integritee"><img src={mediumlogo} width={20} alt="icon" /> </a> </li>
                        <li> <a rel="noreferrer" target="_blank" href="https://discord.com/invite/anhtxwr4eS"><img src={discordl} width={20} alt="icon" /> </a> </li>

                        </ul>
                    </div>
                    <div className="bottom-nav">
                        <ul style={{ listStyleType: 'none' }}>
                            <li> <a href="https://www.integritee.network/privacy-policy">Impressum</a> </li>
                            <li> <a href="https://www.integritee.network/privacy-policy">Privacy Policy</a> </li>
                        </ul>
                    </div>
                </Container>
        </div>
  );
}
