import { useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/iexec.png'
import { useWeb3Modal } from '@web3modal/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDisconnect } from 'wagmi';


function SideBar(props) {
    const { open, close } = useWeb3Modal();
    const {disconnect} = useDisconnect();

    async function DisconnectDapp() {
        await disconnect();
        props.setConnect(false);
    }
    
    return (
        <div className='fixed flex h-full w-full sm:w-60 flex-col justify-between transform -translate-x-full sm:translate-x-0 border-r border-gray-200 bg-gray-50 p-4 transition-all duration-200'>
            <div className='flex flex-col gap-6'>
                <div className='flex gap-2 whitespace-nowrap items-center'>
                    <Image src={logo} alt="iExec Logo" className='w-32'/>
                </div>
                <div className='grid gap-2'>
                    <Link href='/'>
                        <div className='flex items-center p-2 ease-in-out hover:bg-gray-200 rounded-md font-semibold text-black'>My Data</div>
                    </Link>
                    <Link href='/protect'>
                        <div className='flex items-center p-2 ease-in-out hover:bg-gray-200 rounded-md font-semibold text-black'>Protect Data</div>
                    </Link>
                    <Link href='/email'>
                        <div className='flex items-center p-2 ease-in-out hover:bg-gray-200 rounded-md font-semibold text-black'>Send email</div>
                    </Link>
                </div>   
            </div>
            <div>
                <div className='grid gap-2'>
                    {props.connected &&
                        <div onClick={() => DisconnectDapp()} className='flex justify-between items-center p-2 ease-in-out hover:bg-gray-200 rounded-md font-semibold text-black cursor-pointer'>
                            <p>Sign out</p>
                            <LogoutOutlinedIcon/>
                        </div>
                    }
                    {!props.connected &&
                        <div onClick={() => open()} className='flex justify-between items-center p-2 ease-in-out hover:bg-gray-200 rounded-md font-semibold text-black cursor-pointer'>
                            <p>Sign In</p>
                            <MoreVertIcon/>
                        </div>
                    }
                </div>   
            </div>
        </div>
    );
  }
  
 export default SideBar;