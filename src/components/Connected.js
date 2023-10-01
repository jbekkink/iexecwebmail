import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import SideBar from './Sidebar';
import ConnectMessage from './ConnectMessage';
import Overview from './Overview';


const Connected = (props) => {
    const [isSignedIn, setSignedIn] = useState(false); 
    const { address, connector, isConnected, isConnecting, isDisconnected, isReconnecting, status } = useAccount();
    const {chain} = useNetwork();
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (address && connector && isConnected && !isReconnecting && !isConnecting && !isDisconnected && status === 'connected') {
            setLoaded(true);
            setSignedIn(true);
        }
        else if(address && !connector && isConnected && isReconnecting && status==="reconnecting") {
            setLoaded(false);
        }
        else {
            setLoaded(true);
            setSignedIn(false);
        }
        

    }, [connector,isConnected, isConnecting, isDisconnected, isReconnecting, status]); 

    return (
        <>
            <SideBar connected={isSignedIn} setConnect={setSignedIn} />
            <div className='flex max-w-screen-2xl sm:pl-60 text-black overflow-y-scroll overflow-x-hidden w-full '>
                {!isSignedIn && loaded && <div className='flex flex-col p-6 h-full justify-center items-center text-center w-full'><ConnectMessage login={true} switch={false} /></div>}
                {isSignedIn && loaded &&  chain?.id !== 134 && <div className='flex flex-col p-6 h-full justify-center items-center text-center w-full'><ConnectMessage login={false} switch={true} /></div>}
                {isSignedIn && loaded &&  chain?.id === 134 && props && props.children}            
            </div>
        </>     
    );
}

export default Connected;