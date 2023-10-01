import React, { useEffect } from 'react';
import IExecButton from './IExecButton';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { IExecWeb3mail } from "@iexec/web3mail";
import { getAccount } from '@wagmi/core';


const EmailWindow = (props) => {

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    
    const sendMail = async (protectedData, subject, message) => {
        const result = getAccount();
        const provider = await result.connector?.getProvider();
        const web3mail = new IExecWeb3mail(provider);
        const sendEmail = await web3mail.sendEmail({
            protectedData: protectedData,
            emailSubject: subject,
            emailContent: message,
        });
        return sendEmail;
      };

    const handleEmail = async () => {
        if(subject && message) {
            try {
                setLoading(true);
                await sendMail(props.receiver, subject.toString(), message.toString());

            } catch (error) {
                toast.error(String(error));
            }
            setLoading(false);
                //Reset form
            setSubject('');
            setMessage('');
        }
        else {
            toast.error("Please fill in all fields");
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-semibold'>Send Email</h2>
                <div className='text-bold cursor-pointer p-2' onClick={() => props.setEmailwindow(false)}>Close</div>
            </div>
            <div className='text-neutral-800'>
                <div className='border-t border-b p-3 border-black border-opacity-20 w-full'>
                    <div className=''>To {props.receiver}</div>
                </div>
                <div className='border-b border-black border-opacity-20 w-full'>
                    <input className='w-full p-3 outline-none' type='text' placeholder='Subject' onChange={handleSubjectChange}/>
                </div>
                <div className='w-full h-80'>
                    <textarea className='w-full h-full p-3 outline-none' type='text' placeholder='Message' onChange={handleMessageChange}/>
                </div>
            </div>
            {!loading && <div onClick={handleEmail}><IExecButton>Send Email</IExecButton></div>}
            <ToastContainer />
        </div>
    );
}

export default EmailWindow;