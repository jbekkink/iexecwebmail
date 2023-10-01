import React, { useEffect } from 'react';
import IExecButton from './IExecButton';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Link from 'next/link';
import DataBox from './DataBox';
import { getAccount } from '@wagmi/core';
import { IExecDataProtector } from '@iexec/dataprotector';
import { useState } from 'react';
import { useAccount } from "wagmi";

const colors = [
'from-indigo-400 to-purple-400 hover:from-indigo-600 hover:to-purple-600', 
'from-emerald-400  to-cyan-400 hover:from-emerald-600 hover:to-cyan-600', 
'from-fuchsia-400 to-pink-300 hover:from-fuchsia-600 hover:to-pink-500',
'from-red-300 to-orange-300 hover:from-red-500 hover:to-orange-500',
'from-orange-300 to-amber-300 hover:from-orange-500 hover:to-amber-500',
'from-blue-300 to-violet-300 hover:from-blue-500 hover:to-violet-500',
'from-indigo-300 to-purple-400 hover:from-indigo-500 hover:to-purple-500',
'from-green-400 to-teal-300 hover:from-green-600 hover:to-teal-500'
];

const Overview = (props) => {
    const [protectedData, setProtectedData] = useState('');
    const getData = async (label="main") => {
        try{
            const result = getAccount();
            let provider = await result.connector?.getProvider();
            const dataProtector = new IExecDataProtector(provider);
            const listProtectedData = await dataProtector.fetchProtectedData({
            owner: result.address
            });
            if (props.main) setProtectedData(listProtectedData.slice(0,4));
            else setProtectedData(listProtectedData);
        return listProtectedData;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col gap-6 p-6 w-full transition duration-200 ease-in">
            <div className='flex justify-between items-center'>
                <div><h2 className="font-bold text-3xl">My Data</h2></div>
                <Link href="/protect"><IExecButton>Protect Data</IExecButton></Link>
            </div>

            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {protectedData && 
                protectedData.map((data, index) => (
                    <Link href={{ pathname: `/data/${data.address}`, query: { name: data.name, date: data.creationTimestamp, email: data.schema.email, index: index }}}>
                        <DataBox key={index} title={data.name} email={data.schema.email} bg={colors[(index % colors.length)]}/>
                    </Link>
                ))}
            </div>
            
        </div>

    );
}

export default Overview;