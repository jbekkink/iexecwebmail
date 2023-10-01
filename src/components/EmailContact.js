import React, { useEffect, useState } from 'react';
import { IExecWeb3mail } from "@iexec/web3mail";
import { Alchemy, Network } from "alchemy-sdk";
import { PropaneTwoTone } from '@mui/icons-material';
import IExecButton from './IExecButton';
import {aicoins, deficoins, nftcoins} from '../utils/coins.js';



const EmailContact = (props) => {
    function handleEmail() {
        props.setEmailwindow(true);
        props.setReceiver(props.address);
    }

    return (
        <>
        <div className='w-full border border-opacity-20 rounded-md shadow-md p-3'>
            <div className='flex flex-col justify-between md:items-center md:flex-row'>
                <div className='font-semibold text-sm md:text-base'>{props.address}</div>
                <div onClick={handleEmail}><IExecButton>Send Email</IExecButton></div>
            </div>
        </div>
        </>);
}

export default EmailContact;