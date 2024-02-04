import React, { useState, useEffect } from 'react';
import logo from './css/integritee-logo.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import subscanlogo from './Images/social-blue-logo/Subscan-logo.png';
import mediumlogo from './Images/Medium-Logo.png';
import subsociallogo from './Images/subsocial-20x20px white.png';
import elementlogo from './Images/element_20x20px white.png';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrLinkedinOption } from 'react-icons/gr';
import { FaTelegramPlane } from 'react-icons/fa';
import discordl from './Images/Discord-20x20px WHITE-01.png';

import { Container, Menu } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { useGlobalState } from './state';

function Main (props) {
  const { keyring } = useSubstrate();
  const { setAccountAddress } = props;
  const [, setAccountSelected] = useState('');
  const [toggleMenuFun, setToggleMenuFun] = useState(false);
  const [crowdLoanRunning] = useGlobalState('crowdLoanRunning');

  // Get the list of accounts we possess the private key for
  let keyringOptions = [];
  if (keyring) {
    keyringOptions = keyring.getPairs().map((account) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase(),
      icon: 'user'
    }));
  }
  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : '';

  // Set the initial address
  useEffect(() => {
    setAccountAddress(initialAddress);
    setAccountSelected(initialAddress);
    scroll();
  }, [setAccountAddress, initialAddress]);

  const scroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  };

  return (
    <Menu tabular className='main-menu' id='main-nav'>
      <Container>
        <Menu.Menu className='logo'>
          <a href="/#">
            {' '}
            <img src={logo} alt='logo' width={200} />
          </a>
        </Menu.Menu>
        <Menu.Menu
          position='right'
          className={`toggle-menu ${toggleMenuFun ? 'open' : ''}`}
        >

         

          {crowdLoanRunning &&
          <a className='ui primary gradient-btn button' style={{ lineHeight: '1.5' }} href='#participate' >
            Participate Now!
          </a>
          }
          {!crowdLoanRunning &&
          <a className="ui primary gradient-btn button" style={{ lineHeight: '1.5' }} href="https://mailchi.mp/integritee/get-notified">Get Notified!</a>
          }
          <div className='nav-social'>
            <ul style={{ listStyleType: 'none' }}>
              <li>
                {' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.linkedin.com/company/integritee/'
                >
                 <GrLinkedinOption />
                </a>{' '}
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://t.me/Integritee_Official'
                >
                 <FaTelegramPlane/>
                </a>{' '}
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://twitter.com/integri_t_e_e'
                >
                 <AiOutlineTwitter />
                </a>{' '}
              </li>
              <li>
                {' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://app.element.io/#/room/#integritee-watercooler:matrix.org'
                >
                  <img src={elementlogo} alt='element logo' width={20} />{' '}
                </a>{' '}
              </li>
              <li>
                {' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://app.subsocial.network/4638'
                >
                  <img src={subsociallogo} alt='subsocial logo' width={20} />{' '}
                </a>{' '}
              </li>
              <li>
                {' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://medium.com/integritee'
                >
                  <img src={mediumlogo} alt='medium logo' width={20} />{' '}
                </a>{' '}
              </li>
              <li>
                {' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://discord.com/invite/anhtxwr4eS'
                >
                  <img src={discordl} alt='discord logo' width={20} />{' '}
                </a>{' '}
              </li>
              <li>
                {' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://integritee.subscan.io/'
                >
                  <img src={subscanlogo} alt='subscan logo' width={20} />{' '}
                </a>{' '}
              </li>


            </ul>
          </div>
        </Menu.Menu>
      </Container>
      <div
        className='toggle-btn'
        onClick={() => setToggleMenuFun(!toggleMenuFun)}
      >
        {toggleMenuFun ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
    </Menu>
  );
}

export default function UpperMenu (props) {
  // const { api, keyring } = useSubstrate();
  return <Main {...props} />;
}
