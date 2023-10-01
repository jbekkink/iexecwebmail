import React, { useEffect } from 'react';
import { getAccount } from '@wagmi/core';
import { IExecDataProtector, DataSchema } from '@iexec/dataprotector';
import {
    TextField,
    Typography,
    Button,
    Alert,
    CircularProgress,
    Link,
    Box,
    AppBar,
    Toolbar,
    Container,
  } from '@mui/material';
import { useState, useRef } from 'react';
import IExecButton from './IExecButton';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//revoke access by calling revokeOneAccess method from @iexec/dataprotector
const revokeAccessFunc = async (
    protectedData,
    authorizedUser,
    authorizedApp
  ) => {
    const result = getAccount();
    const provider = await result.connector?.getProvider();
  
    // Configure private data protector
    const dataProtector = new IExecDataProtector(provider);
  
    const grantedAccessArray = await dataProtector.fetchGrantedAccess({
      protectedData,
      authorizedUser,
      authorizedApp,
    });
    const { txHash } = await dataProtector.revokeOneAccess(grantedAccessArray[0]);
  
    return txHash;
  };
  
  //grant access by calling grantAccess method from @iexec/dataprotector
  const grantAccessFunc = async (
    protectedData,
    authorizedUser,
    authorizedApp,
    numberOfAccess,
    pricePerAccess
  ) => {
    const result = getAccount();
    const provider = await result.connector?.getProvider();
  
    // Configure private data protector
    const dataProtector = new IExecDataProtector(provider);
  
    const accessHash = await dataProtector.grantAccess({
      protectedData,
      authorizedUser,
      authorizedApp,
      numberOfAccess,
      pricePerAccess,
    });
    return accessHash;
  };

const Access = (props) => {

    const [loadingGrant, setLoadingGrant] = useState(false);
    const [errorGrant, setErrorGrant] = useState('');

    const [grantAccess, setGrantAccess] = useState();
    const [accessNumber, setAccessNumber] = useState(1);

    const [authorizedUser, setAuthorizedUser] = useState('');
    const [myAddress, setMyAddress] = useState('');

    const [price, setPrice] = useState(0);
    
    const handleAccessNumberChange = (e) => {
        setAccessNumber(e.target.value);
      };
    
    const authorizedUserChange = (e) => {
        setAuthorizedUser(e.target.value);
    };

    const handlePriceChange = (e) => {
      setPrice(e.target.value);
  };

    useEffect(() => {
        if (props.address) {
            setMyAddress(props.address);
        }
    }, [props.address]);
            

    const grantAccessSubmit = async () => {
    setErrorGrant('');
    try {
      setAuthorizedUser(authorizedUser);
      setLoadingGrant(true);
      const accessHash = await grantAccessFunc(
        myAddress,
        authorizedUser,
        "web3mail.apps.iexec.eth",
        accessNumber,
        price
      );
      setErrorGrant('');
      setGrantAccess(accessHash);
    } catch (error) {
      setErrorGrant(String(error));
      setGrantAccess(undefined);
    }
    setLoadingGrant(false);
    props.setRefresh(true);
  };

    return (
        <div className='w-full border rounded-xl border-opacity-30 p-6'>
            <div><h2 className="text-xl">Grant Access</h2></div>
            <Box id="form-box">
              <TextField fullWidth type="number" id="age" label="Access Number" variant="outlined"
                value={accessNumber} InputProps={{ inputProps: { min: 1 } }} onChange={handleAccessNumberChange} sx={{ mt: 2 }} />
              
              <TextField fullWidth type="number" id="price" label="Access Price" variant="outlined"
                value={price} InputProps={{ inputProps: { min: 0 } }} onChange={handlePriceChange} sx={{ mt: 2 }} />

              <TextField fullWidth id="authorizedUser" label="User Address Restricted" variant="outlined" sx={{ mt: 2 }}
                value={authorizedUser} onChange={authorizedUserChange} type="text"/>
              {!loadingGrant && myAddress && (
                <div onClick={grantAccessSubmit} className='mt-6'><IExecButton>Grant Access</IExecButton></div>
              )}
              {errorGrant && (
                <Alert sx={{ mt: 3, mb: 2 }} severity="error">
                  <Typography variant="h6"> Grant Access failed </Typography>
                  {errorGrant}
                </Alert>
              )}
              {grantAccess && !errorGrant && (
                <>
                  <Alert sx={{ mt: 3, mb: 2 }} severity="success">
                    <Typography variant="h6">
                      Your access has been granted !
                    </Typography>
                  </Alert>
                </>
              )}
              {loadingGrant && (
                <CircularProgress id="spacingStyle"></CircularProgress>
              )}
            </Box>
        </div>
    );
}

export default Access;