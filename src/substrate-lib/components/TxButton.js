import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { web3FromSource } from '@polkadot/extension-dapp';
import { ReactComponent as SVGIcon } from '../../Images/copy_symbole_V1.svg';
import { useSubstrate } from '../';
import utils from '../utils';

function TxButton ({
  setLoading = null,
  accountAddress = null,
  formState = null,
  grc = null,
  erc = null,
  accountPair = null,
  label,
  setStatus,
  color = 'blue',
  style = null,
  type = 'QUERY',
  attrs = null,
  disabled = false
}) {
  // Hooks
  const { api } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [sudoKey, setSudoKey] = useState(null);

  const { palletRpc, callable, inputParams, paramFields, disableButton } =
    attrs;

  let txxHash = null;
  let contributionError = null;

  const isQuery = () => type === 'QUERY';
  const isSudo = () => type === 'SUDO-TX';
  const isUncheckedSudo = () => type === 'UNCHECKED-SUDO-TX';
  const isUnsigned = () => type === 'UNSIGNED-TX';
  const isSigned = () => type === 'SIGNED-TX';
  const isRpc = () => type === 'RPC';
  const isConstant = () => type === 'CONSTANT';

  const loadSudoKey = () => {
    (async function () {
      if (!api || !api.query.sudo) {
        return;
      }
      const sudoKey = await api.query.sudo.key();
      sudoKey.isEmpty ? setSudoKey(null) : setSudoKey(sudoKey.toString());
    })();
  };

  useEffect(loadSudoKey, [api]);

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected }
    } = accountPair;
    let fromAcct;

    // signer is from Polkadot-js browser extension
    if (isInjected) {
      const injected = await web3FromSource(source);
      fromAcct = address;
      api.setSigner(injected.signer);
    } else {
      fromAcct = accountPair;
    }

    return fromAcct;
  };

  const txResHandlerSaveTransaction = async (status) => {
    const blockHash = status.asInBlock.toString();
    if (isSigned()) {
      if (document.getElementById('grc') && document.getElementById('erc')) {
        saveParticipateInfo(
          accountAddress,
          formState,
          document.getElementById('grc').value,
          document.getElementById('erc')
            ? document.getElementById('erc').value
            : new URL(window.location.href).searchParams.get('ref'),
          blockHash
        );
      } else if (document.getElementById('erc')) {
        saveParticipateInfo(
          accountAddress,
          formState,
          '',
          document.getElementById('erc')
            ? document.getElementById('erc').value
            : new URL(window.location.href).searchParams.get('ref'),
          blockHash
        );
      } else if (document.getElementById('grc')) {
        saveParticipateInfo(accountAddress, formState, document.getElementById('grc').value, '', blockHash);
      }
      setLoading(false);
    }
    setStatus(viewTransactionInfo(status));
  };

  const viewTransactionInfo = (status) => {
    const _blockhash = (status.type === 'InBlock') ? status.asInBlock.toString() : status.asFinalized.toString();
    return (
       <p>
         {contributionError ? `Transaction failed: ${contributionError}` : ''}
         <br/>
         😉 {status.type}. Block hash: <br/>
         {_blockhash + ' '}
         <button className="copyButton" onClick={() => { navigator.clipboard.writeText(_blockhash); }}>
           <div className="copyIcon">
           <SVGIcon/>
           <span></span>
         </div>
         </button>
         <br/>
         You can get more details on your transaction: <a href={`https://kusama.subscan.io/extrinsic/${txxHash}`}>{txxHash + ' '}</a>
         <button className="copyButton" onClick={() => { navigator.clipboard.writeText(txxHash); }}>
         <div className="copyIcon">
           <SVGIcon/>
           <span></span>
         </div>
       </button>
       </p>
    );
  };

  const txResHandler = ({ status, dispatchError }) => {
    // status would still be set, but in the case of error we can shortcut
    // to just check it (so an error would indicate InBlock or Finalized)
    if (dispatchError) {
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        const decoded = api.registry.findMetaError(dispatchError.asModule);
        const { docs, name, section } = decoded;
        console.log(`${section}.${name}: ${docs.join(' ')}`);
        contributionError = `${section}.${name}: ${docs.join(' ')}`;
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        console.log(dispatchError.toString());
        contributionError = dispatchError.toString();
      }
    }
    status.isInBlock
      ? txResHandlerSaveTransaction(status)
      : status.isFinalized
        ? setStatus(viewTransactionInfo(status))
        : setStatus(`Current transaction status: ${status.type}`);
  };

  const txErrHandler = (err) => {
    setStatus(`😞 Transaction Failed: ${err.toString()}`);
    if (isSigned()) {
      setLoading(false);
    }
    console.log('+++++++++++++++++++++');
    console.log(accountAddress);
    console.log(formState);
    console.log(grc);
    console.log(
      document.getElementById('erc')
        ? document.getElementById('erc').value
        : new URL(window.location.href).searchParams.get('ref')
    );
    console.log('+++++++++++++++++++++');
  };

  const sudoTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx.sudo.sudo(api.tx[palletRpc][callable](...transformed))
      : api.tx.sudo.sudo(api.tx[palletRpc][callable]());

    const unsub = txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => unsub);
  };

  const uncheckedSudoTx = async () => {
    const fromAcct = await getFromAcct();
    const txExecute = api.tx.sudo.sudoUncheckedWeight(
      api.tx[palletRpc][callable](...inputParams),
      0
    );

    const unsub = txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => unsub);
  };

  const saveParticipateInfo = (accountAddress, formState, grc, erc, blockHash) => {
    const formdata = new FormData();
    formdata.append('Participant[email]', grc);
    formdata.append('Participant[referrer_code]', erc);
    formdata.append('Participant[block_hash]', blockHash);
    formdata.append('Participant[account_nr]', accountAddress);
    formdata.append('Participant[amount]', formState.amount);

    const requestOptions = {
      method: 'POST',
      headers: {
        'x-requested-with': 'XMLHttpRequest'
      },
      body: formdata,
      redirect: 'follow'
    };

    fetch('https://api.crowdloan.integritee.network/storeuser', requestOptions)
      .catch((error) => {
        console.log('error', error);
        console.log('trying again');
        setLoading(true);
        setTimeout(() => { saveParticipateInfo(accountAddress, formState, grc, erc, blockHash); }, 2000);
      });
    setLoading(false);
  };

  const signedTx = async () => {
    if (document.getElementById('grc')) {
      if (!document.getElementById('grc').checkValidity()) {
        return;
      }
    }
    if (document.getElementById('erc')) {
      if (!document.getElementById('erc').checkValidity()) {
        return;
      }
    }
    setStatus('Sending...');
    setLoading(true);

    const fromAcct = await getFromAcct();
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    const unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    txxHash = txExecute.hash.toHex();
    setUnsub(() => unsub);
  };

  const unsignedTx = async () => {
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    const unsub = await txExecute.send(txResHandler).catch(txErrHandler);
    setUnsub(() => unsub);
  };

  const queryResHandler = (result) => {
    result.isNone ? setStatus('None') : setStatus(result.toString());
  };
  const query = async () => {
    const transformed = transformParams(paramFields, inputParams);
    const unsub = await api.query[palletRpc][callable](
      ...transformed,
      queryResHandler
    );
    setUnsub(() => unsub);
  };

  const rpc = async () => {
    const transformed = transformParams(paramFields, inputParams, {
      emptyAsNull: false
    });
    const unsub = await api.rpc[palletRpc][callable](
      ...transformed,
      queryResHandler
    );
    setUnsub(() => unsub);
  };

  const constant = () => {
    const result = api.consts[palletRpc][callable];
    result.isNone ? setStatus('None') : setStatus(result.toString());
  };

  const transaction = async (event) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    if (!isSigned()) {
      setStatus('Sending...');
    }

    (isSudo() && sudoTx()) ||
      (isUncheckedSudo() && uncheckedSudoTx()) ||
      (isSigned() && signedTx()) ||
      (isUnsigned() && unsignedTx()) ||
      (isQuery() && query()) ||
      (isRpc() && rpc()) ||
      (isConstant() && constant());

    console.log('clicked');
  };

  const transformParams = (
    paramFields,
    inputParams,
    opts = { emptyAsNull: true }
  ) => {
    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map((inputParam) => {
      // To cater the js quirk that `null` is a type of `object`.
      if (
        typeof inputParam === 'object' &&
        inputParam !== null &&
        typeof inputParam.value === 'string'
      ) {
        return inputParam.value.trim();
      } else if (typeof inputParam === 'string') {
        return inputParam.trim();
      }
      return inputParam;
    });
    const params = paramFields.map((field, ind) => ({
      ...field,
      value: paramVal[ind] || null
    }));

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '') { return opts.emptyAsNull ? [...memo, null] : memo; }

      let converted = value;

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map((e) => e.trim());
        converted = converted.map((single) =>
          isNumType(type)
            ? single.indexOf('.') >= 0
              ? Number.parseFloat(single)
              : Number.parseInt(single)
            : single
        );
        return [...memo, converted];
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted =
          converted.indexOf('.') >= 0
            ? Number.parseFloat(converted)
            : Number.parseInt(converted);
      }
      return [...memo, converted];
    }, []);
  };

  const isNumType = (type) =>
    utils.paramConversion.num.some((el) => type.indexOf(el) >= 0);

  const allParamsFilled = () => {
    if (paramFields.length === 0) {
      return true;
    }

    return paramFields.every((paramField, ind) => {
      const param = inputParams[ind];
      if (paramField.optional) {
        return true;
      }
      if (param == null) {
        return true;
      }

      const value = typeof param === 'object' ? param.value : param;
      return value !== null && value !== '';
    });
  };

  const isSudoer = (acctPair) => {
    if (!sudoKey || !acctPair) {
      return false;
    }
    return acctPair.address === sudoKey;
  };

  return (
    <Button
      className='gradient-btn'
      // basic
      // color={color}
      style={style}
      type='submit'
      onClick={transaction}
      disabled={
        disabled ||
        !palletRpc ||
        !callable ||
        !allParamsFilled() ||
        accountPair === '' ||
        disableButton ||
        ((isSudo() || isUncheckedSudo()) && !isSudoer(accountPair))
      }
    >
      {label}
    </Button>
  );
}

// prop type checking
TxButton.propTypes = {
  accountPair: PropTypes.object,
  setStatus: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'QUERY',
    'RPC',
    'SIGNED-TX',
    'UNSIGNED-TX',
    'SUDO-TX',
    'UNCHECKED-SUDO-TX',
    'CONSTANT'
  ]).isRequired,
  attrs: PropTypes.shape({
    palletRpc: PropTypes.string,
    callable: PropTypes.string,
    inputParams: PropTypes.array,
    paramFields: PropTypes.array
  }).isRequired
};

function TxGroupButton (props) {
  return (
    <Button.Group>
      <TxButton label='Unsigned' type='UNSIGNED-TX' color='grey' {...props} />
      <Button.Or />
      <TxButton label='Signed' type='SIGNED-TX' color='blue' {...props} />
      <Button.Or />
      <TxButton label='SUDO' type='SUDO-TX' color='red' {...props} />
    </Button.Group>
  );
}

export { TxButton, TxGroupButton };
