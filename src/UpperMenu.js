import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { ReactComponent as Logo } from './css/IntegriteeLogoAndSlogan.svg';
import logo from './css/IntegriteeLogoAndSlogan.svg';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import icon0 from './Images/i0.svg';
import mediumlogo from './Images/Medium-Logo.png';
import subsociallogo from './Images/subsocial-20x20px white.png';
import elementlogo from './Images/element_20x20px white.png';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrLinkedinOption } from 'react-icons/gr';
import { FaTelegramPlane } from 'react-icons/fa';

import {
  Menu,
  Button,
  Dropdown,
  Container,
  Icon,
  Image,
  Label
} from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main (props) {
  const { keyring } = useSubstrate();
  const { setAccountAddress } = props;
  const [accountSelected, setAccountSelected] = useState('');
  const [toggleMenuFun, setToggleMenuFun] = useState(false);

  // Get the list of accounts we possess the private key for
  let keyringOptions = [];
  if(keyring){
    keyringOptions = keyring.getPairs().map(account => ({
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

  const onChange = address => {
    // Update state with new account address
    setAccountAddress(address);
    setAccountSelected(address);
  };

  const scroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  };

  return (
    
    <Menu
      tabular
      className="main-menu"
      id="main-nav"
    >
       
      <Container>
        
        <Menu.Menu className="logo">
         <a > <img src={logo} width={200} /></a> 
        </Menu.Menu>
        <Menu.Menu position='right' className={`toggle-menu ${toggleMenuFun ? "open" : ""}`}>
          
          <Menu.Item
            name='Crowdloan Campaign'
            href="#crowdloan"
          />

          <Menu.Item
            name='Referral Program'
            href="#referral"
          />

          <Menu.Item
            name='TEER Token'
            href="#TeerToken"
          />
          <Menu.Item
            name='FAQ'
            href="#FAQ"
          />

          <a className="ui primary gradient-btn button" href="#participate">Participate Now!</a>
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
      <div className='toggle-btn' onClick={() => setToggleMenuFun(!toggleMenuFun)}>
        {toggleMenuFun ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
    </Menu>
  );
}

function BalanceAnnotation (props) {
  const { accountSelected } = props;
  const { api } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(0);

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe;

    // If the user has selected an address, create a new subscription
    accountSelected &&
      api.query.system.account(accountSelected, balance => {
        setAccountBalance(balance.data.free.toHuman());
      })
        .then(unsub => {
          unsubscribe = unsub;
        })
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, accountSelected]);

  return accountSelected
    ? <Label pointing='left'>
      <Icon name='money' color='green' />
      {accountBalance}
    </Label>
    : null;
}

export default function UpperMenu (props) {
  const { api, keyring } = useSubstrate();
  return  (<Main {...props} />)
}