import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import ConnectMessage from '@/components/ConnectMessage'
import { useEffect, useState } from 'react'
import SignClient from "@walletconnect/sign-client";
import Connected from '../components/Connected';
import { BrowserRouter } from 'react-router-dom';

const bellecour = {
  id: 0x86,
  name: 'iExec Sidechain',
  network: 'bellecour',
  nativeCurrency: {
    decimals: 18,
    name: 'xRLC',
    symbol: 'xRLC',
  },
  rpcUrls: {
    public: { http: ['https://bellecour.iex.ec'] },
    default: { http: ['https://bellecour.iex.ec'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Blockscout',
      url: 'https://blockscout-bellecour.iex.ec',
    },
    default: { name: 'Blockscout', url: 'https://blockscout-bellecour.iex.ec' },
  },
};


export default function App({ Component, pageProps }: AppProps) {

  const chains = [bellecour];
  const projectId = ADD_PROJECT_ID_HERE

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({chains,projectId}),
    publicClient
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />    
      <meta name="viewport" content="width=device-width, initial-scale=1" />

    </Head>
    <WagmiConfig config={wagmiConfig}>
            <Layout>
              <Connected>
                <Component {...pageProps} />
              </Connected>
            </Layout>   
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>);
}
