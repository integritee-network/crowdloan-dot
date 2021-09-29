import React, { useState, useEffect } from 'react';
// import { ReactComponent as Logo } from './css/IntegriteeLogoAndSlogan.svg';
import logo from './css/IntegriteeLogoAndSlogan.svg';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import elementlogo from './Images/social-blue-logo/Element-logo.png';
import linkedinlogo from './Images/social-blue-logo/LinkedIn-logo.png';
import mediumlogo from './Images/social-blue-logo/Medium-Logo.png';
import subsociallogo from './Images/social-blue-logo/Subsocial-logo.png';
import telegramlogo from './Images/social-blue-logo/Telegram-logo.png';
import twitterlogo from './Images/social-blue-logo/Twitter-logo.png';
import discordlogo from './Images/social-blue-logo/Discord-logo.png';

import { Menu, Container, Icon, Label } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main(props) {
  const { keyring } = useSubstrate();
  const { setAccountAddress } = props;
  const [accountSelected, setAccountSelected] = useState('');
  const [toggleMenuFun, setToggleMenuFun] = useState(false);

  // Get the list of accounts we possess the private key for
  let keyringOptions = [];
  if (keyring) {
    keyringOptions = keyring.getPairs().map((account) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase(),
      icon: 'user',
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

  const onChange = (address) => {
    // Update state with new account address
    setAccountAddress(address);
    setAccountSelected(address);
  };

  const scroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  };

  return (
    <Menu tabular className='main-menu' id='main-nav'>
      <Container>
        <Menu.Menu className='logo'>
          <a>
            {' '}
            <img src={logo} alt='logo' width={200} />
          </a>
        </Menu.Menu>
        <Menu.Menu
          position='right'
          className={`toggle-menu ${toggleMenuFun ? 'open' : ''}`}
        >
          <Menu.Item name='Crowdloan Campaign' href='#crowdloan' />

          <Menu.Item name='Referral Program' href='#referral' />

          <Menu.Item name='TEER Token' href='#TeerToken' />
          <Menu.Item name='FAQ' href='#FAQ' />

          <a className='ui primary gradient-btn button' style={{lineHeight:'1.5'}} href='#participate'>
            Participate Now!
          </a>
          <div className='nav-social'>
            <ul>
              <li>
                {' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.linkedin.com/company/integritee/'
                >
                  <img src={linkedinlogo} alt='linkedin logo' width={20} />{' '}
                </a>{' '}
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://t.me/Integritee_Official'
                >
                  <img src={telegramlogo} alt='telegram logo' width={20} />{' '}
                </a>{' '}
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://twitter.com/integri_t_e_e'
                >
                  <img src={twitterlogo} alt='twitter logo' width={20} />{' '}
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
                  <img src={discordlogo} alt='discord logo' width={20} />{' '}
                </a>{' '}
              </li>
            </ul>
          </div>
        </Menu.Menu>

        {/* <Menu.Menu position='right' style={{ alignItems: 'center' }}>
          { !accountSelected
            ? <span>
              Add your account with the{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/polkadot-js/extension'
              >
                Polkadot JS Extension
              </a>
            </span>
            : null }
          <CopyToClipboard text={accountSelected}>
            <Button
              basic
              circular
              size='large'
              icon='user'
              color={accountSelected ? 'green' : 'red'}
            />
          </CopyToClipboard>
          <Dropdown
            search
            selection
            clearable
            placeholder='Select an account'
            options={keyringOptions}
            onChange={(_, dropdown) => {
              onChange(dropdown.value);
            }}
            value={accountSelected}
          />
          <BalanceAnnotation accountSelected={accountSelected} />
        </Menu.Menu> */}
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

function BalanceAnnotation(props) {
  const { accountSelected } = props;
  const { api } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(0);

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe;

    // If the user has selected an address, create a new subscription
    accountSelected &&
      api.query.system
        .account(accountSelected, (balance) => {
          setAccountBalance(balance.data.free.toHuman());
        })
        .then((unsub) => {
          unsubscribe = unsub;
        })
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, accountSelected]);

  return accountSelected ? (
    <Label pointing='left'>
      <Icon name='money' color='green' />
      {accountBalance}
    </Label>
  ) : null;
}

export default function UpperMenu(props) {
  const { api, keyring } = useSubstrate();
  return <Main {...props} />;
}
