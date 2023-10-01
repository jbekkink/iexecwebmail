import React, { useEffect } from 'react';
import { getAccount } from '@wagmi/core';
import { IExecDataProtector, DataSchema } from '@iexec/dataprotector';
import { useState, useRef } from 'react';
import IExecButton from './IExecButton';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Addresses = (props) => {
    const [addressList, setAddressList] = useState([]);

    const fetchAddress = async (address) => {
        try{
            const result = getAccount();
            const provider = await result.connector?.getProvider();
            let dataProtector = new IExecDataProtector(provider);
            const listProtectedData = await dataProtector.fetchGrantedAccess({
                protectedData: address
            })
            setAddressList(listProtectedData);
        } catch (error) {
            console.log(error);
        }
    }

    const revokeAccessFunc = async (protectedData) => {
        try {
            const result = getAccount();
            const provider = await result.connector?.getProvider();
            const dataProtector = new IExecDataProtector(provider);
            await dataProtector.revokeOneAccess(protectedData);
            props.setRefresh(true);
            toast.success('Successfully revoked access!');
        } catch (error) {
            toast.error('Could not revoke access');
            console.log(error);
        }
      };

    useEffect(() => {
        fetchAddress(props.address);
    }, []);

    useEffect(() => {
        if (props.refresh) {
            fetchAddress(props.address);
            props.setRefresh(false);
        }
    }, [props.refresh]);

    return (
        <div className='w-full flex flex-col gap-3'>
            <h2 className='text-2xl'>Addresses with access</h2>
            {addressList && addressList.length > 0 && addressList.map((data, index) => (
                <div className='w-full border border-opacity-20 rounded-md shadow-md p-3'>
                    <div className='flex justify-between flex-col md:flex-row text-sm md:text-base md:items-center'>
                        <div className='flex flex-col'>
                            <div className='font-semibold'>{data.requesterrestrict}</div>
                            <div className=''>Access price: <span className='font-semibold text-emerald-600'>{data.datasetprice} RLC</span></div>
                        </div>
                        <div onClick={() => revokeAccessFunc(data)}><IExecButton>Revoke Access</IExecButton></div>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}

export default Addresses;