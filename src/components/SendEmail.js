import React from 'react';
import { IExecWeb3mail } from "@iexec/web3mail";
import { getAccount } from '@wagmi/core';
import { useState, useEffect } from 'react';
import { Alchemy, Network } from "alchemy-sdk";
import EmailContact from './EmailContact';
import {aicoins, deficoins, nftcoins} from '../utils/coins.js';
import EmailWindow from './EmailWindow';


const settings = {
    apiKey: ADD_YOUR_KEY_HERE, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
const SendEmail = (props) => {
    const [contacts, setContacts] = useState([]);
    const alchemy = new Alchemy(settings);

    const [ai, setAi] = useState([]);
    const [defi, setDefi] = useState([]);
    const [nft, setNft] = useState([]);

    const [aiquery, setAiQuery] = useState(false);
    const [defiquery, setDefiQuery] = useState(false);
    const [nftquery, setNftQuery] = useState(false);

    const [emailwindow, setEmailwindow] = useState(false);
    const [receiver, setReceiver] = useState('')
    const [passdata, setpassdata] = useState(null);
    
    const FetchContacts = async () => {
        try {
            const result = getAccount();
            const provider = await result.connector?.getProvider();
            const web3mail = new IExecWeb3mail(provider);
            const listContact = await web3mail.fetchMyContacts();
            setContacts(listContact);
            
        } catch (error) {
            console.log(error);
        }
    };

    const TokenHoldings = async (address) => {
        const balances = await alchemy.core.getTokenBalances(address);
        return balances;
    }
    
    const TokenInfo = async (tokenbalances, contact) => {
        for (let i = 0; i < tokenbalances.length; i++) {
            const metadata = await alchemy.core.getTokenMetadata(tokenbalances[i].contractAddress);
            const token_name = metadata.symbol;
            if (!ai.includes(contact) && aicoins.includes(token_name)) {
                const tokenlist = ai;
                tokenlist.push(contact);
                setAi(tokenlist);
            }
            if (!defi.includes(contact) && deficoins.includes(token_name)) {
                const tokenlist = defi;
                tokenlist.push(contact);
                setAi(tokenlist);
            }
            if (!nft.includes(contact) && nftcoins.includes(token_name)) {
                const tokenlist = nft;
                tokenlist.push(contact);
                setAi(tokenlist);
            }
        }
    }

    useEffect(() => {
        const fetchh = async () => {
            await FetchContacts();
        }
        fetchh();
    }, []);

    useEffect(() => {
        async function getTokenInfo() {
            for (let i = 0; i < contacts.length; i++) {
                const balances = await TokenHoldings(contacts[i].owner);
                await TokenInfo(balances.tokenBalances, contacts[i]);
            }
        }

        if (contacts) {
            getTokenInfo();
        }
    }, [contacts]);

    const handleAll = () => {
        setAiQuery(false);
        setDefiQuery(false);
        setNftQuery(false);
    }

    const handleAi = () => {
        setAiQuery(true);
        setDefiQuery(false);
        setNftQuery(false);
    }

    const handleDefi = () => {
        setAiQuery(false);
        setDefiQuery(true);
        setNftQuery(false);
    }

    const handleNft = () => {
        setAiQuery(false);
        setDefiQuery(false);
        setNftQuery(true);
    }

    return (
        <>
        {!emailwindow && <div className="flex flex-col gap-6 p-6 w-full transition duration-200 ease-in z-0">
            <div className='text-3xl font-semibold'>Send Email</div>
            <div className='w-full flex transition-all duration-200'>
                <div className='w-1/4'>
                    <div onClick={handleAll} className={`${(!aiquery && !defiquery && !nftquery) ? "border-amber-400 text-amber-400" : "border-neutral-500 text-neutral-500"} text-xl font-semibold text-center border-b-2 cursor-pointer hover:text-amber-400 hover:border-amber-400`}>All</div>
                </div>
                <div className='w-1/4'>
                    <div onClick={handleAi} className={`${(aiquery) ? "border-amber-400 text-amber-400" : "border-neutral-500 text-neutral-500"} text-xl font-semibold text-center border-b-2 cursor-pointer hover:text-amber-400 hover:border-amber-400`}>AI Pool</div>
                </div>
                <div className='w-1/4'>
                    <div onClick={handleNft} className={`${(nftquery) ? "border-amber-400 text-amber-400" : "border-neutral-500 text-neutral-500"} text-xl font-semibold text-center border-b-2 cursor-pointer hover:text-amber-400 hover:border-amber-400`}>NFT Pool</div>
                </div>
                <div className='w-1/4'>
                    <div onClick={handleDefi} className={`${(defiquery) ? "border-amber-400 text-amber-400" : "border-neutral-500 text-neutral-500"} text-xl font-semibold text-center border-b-2 cursor-pointer hover:text-amber-400 hover:border-amber-400`}>DeFi Pool</div>
                </div>


                
            </div>

            {!aiquery && !defiquery && !nftquery && contacts && contacts.map((data, index) => (
               <EmailContact address={data.address} key={index} setEmailwindow={setEmailwindow} setReceiver={setReceiver}  />
            ))}
            {aiquery && ai && ai.map((data, index) => (
                <EmailContact address={data.address} key={index} setEmailwindow={setEmailwindow} setReceiver={setReceiver} />
            ))}
            {defiquery && defi && defi.map((data, index) => (
                <EmailContact address={data.address} key={index} setEmailwindow={setEmailwindow} setReceiver={setReceiver} />
            ))}
            {nftquery && nft && nft.map((data, index) => (
                <EmailContact address={data.address} key={index} setEmailwindow={setEmailwindow} setReceiver={setReceiver} />
            ))}
        </div>}
        {emailwindow && <EmailWindow setEmailwindow={setEmailwindow} receiver={receiver} setReceiver={setReceiver}  />}
        </>
    );
}

export default SendEmail;