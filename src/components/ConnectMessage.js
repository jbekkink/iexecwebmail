import React from 'react';
import IExecButton from './IExecButton';
import { useWeb3Modal } from '@web3modal/react';

export default function ConnectMessage(props) {
    const { open, close } = useWeb3Modal();
    const loginbutton = "Connect Wallet";

    return (
        <div className='border border-opacity-60 p-8 rounded-xl shadow-sm transition duration-200 ease-in-out'>
            {props && props.login && 
            <div className='flex flex-col gap-8 text-center'>
                <h2 className='text-3xl font-bold'>Please <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-400'>connect</span> your wallet</h2>
                <div onClick={() => open()}><IExecButton>{loginbutton}</IExecButton></div>
            </div>}
            {props && !props.login && props.switch && 
            <div>
                <h2 className='text-3xl font-bold'>Please switch to the iExec <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-400'>Bellecour</span> Sidechain to continue</h2>
            </div>}
        </div>       
    );
}