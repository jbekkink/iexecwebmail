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


const protectDataFunc = async (data, name) => {
    const result = getAccount();
    const provider = await result.connector?.getProvider();
    const dataProtector = new IExecDataProtector(provider);
    const { address } = await dataProtector.protectData({data,name});
    return address;
  };

const ProtectData = (props) => {

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [name, setName] = useState('');
    const [sendEmail, setSendEmail] = useState(true);
    const [filePath, setFilePath] = useState('');
    const [file, setFile] = useState(null);
    
    const [protectedData, setProtectedData] = useState('');
    const [loadingProtect, setLoadingProtect] = useState(false);
    const [errorProtect, setErrorProtect] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsValidEmail(e.target.validity.valid);
    };
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFileChange = (e) => {
        setFilePath(e.target.value);
        setFile(e.target.files?.[0]);
      };

    const protectMyEmail = async () => {
        setErrorProtect('');
        if (email) {
          const data = { email: email };
          try {
            setLoadingProtect(true);
            const ProtectedDataAddress = await protectDataFunc(data, name);
            setProtectedData(ProtectedDataAddress);
            setErrorProtect('');
          } catch (error) {
            setErrorProtect(String(error));
          }
          setLoadingProtect(false);
          //Reset form 
          setEmail('');
          setName('');
        } else {
          setErrorProtect('Please enter a valid email address');
        }
    };

    const handleFormChange = (bools) => {
        setSendEmail(bools);
        //Reset form
        setEmail('');
        setName('');
        setFilePath('');
        setFile(null);
        setErrorProtect('');
        setProtectedData('');
        setLoadingProtect(false);
    }

    useEffect(() => {
        if (protectedData && !errorProtect) {
          toast.success('Data protected successfully!');
        }
        if (errorProtect) {
            toast.error('Data protection failed!');
        }

    }, [protectedData, errorProtect]);



    async function readFileToArrayBuffer(file) {
        const reader = new FileReader();
      
        return new Promise((resolve, reject) => {
          reader.onerror = () => {reject(new DOMException('Error parsing input file.'))};
          reader.onload = () => {resolve(reader.result)};
          reader.readAsArrayBuffer(file);
        });
      }

    const protectMyFile = async () => {
       let bufferFile = await readFileToArrayBuffer(file);
       const data = { file: bufferFile };
       try {
        setLoadingProtect(true);
        const ProtectedDataAddress = await protectDataFunc(data, name);
        setProtectedData(ProtectedDataAddress);
        setErrorProtect('');
        } catch (error) {
            setErrorProtect(String(error));
        }
        setLoadingProtect(false);
        //Reset form
        setFilePath('');
        setFile(null);
        setName('');
      };


    return (
        <div className="flex flex-col p-6 w-full">
            <div><h2 className="font-bold text-3xl">Protect Data</h2></div>
            <div className='w-full flex justify-center items-center h-full'>
                <div className='p-6 border border-black border-opacity-20 rounded-lg shadow-sm w-full md:w-2/3 xl:w-1/2'>
                    <div className="w-full flex items-center text-center">
                        <div onClick={() => handleFormChange(true)} className={`border-b-2 ${sendEmail ? "border-b-amber-400 font-semibold text-amber-400" : "border-b-neutral-400 text-neutral-500"} cursor-pointer p-3 w-1/2`}><p>E-mail</p></div>
                        <div onClick={() => handleFormChange(false)} className={`border-b-2 ${!sendEmail ? "border-b-amber-400 font-semibold text-amber-400" : "border-b-neutral-400 text-neutral-500"} cursor-pointer p-3 w-1/2`}><p>File</p></div>
                    </div>
                    <Box id="form-box">
                        {sendEmail && 
                        <TextField required fullWidth id="email" label="Email" variant="outlined" sx={{ mt: 3 }} value={email} onChange={handleEmailChange}
                            type="email" error={!isValidEmail} helperText={!isValidEmail && 'Please enter a valid email address'}/>}
                        
                        {!sendEmail && 
                            <div class="flex mt-6" >
                                <input type="file" id="fileInput" className="hidden" onChange={(e) => handleFileChange(e)}/>
                                <label for="fileInput" class="cursor-pointer bg-neutral-50 shadow-sm text-center w-full border border-black border-opacity-30 hover:border-opacity-60 rounded-lg text-black font-semibold py-4 px-4">
                                    Select file
                                </label>
                            </div>}
                            {filePath && <p className="mt-3"><span className='font-semibold'>File: </span>{filePath.split('\\').slice(-1)}</p>}

                        <TextField fullWidth id="name" label="Name of Data" variant="outlined" value={name} onChange={handleNameChange} sx={{ mt: 3, mb: 3}}/>

                        {errorProtect &&
                        <Alert sx={{ mt: 3, mb: 2 }} severity="error">
                            <Typography variant="h6"> Protected email creation failed </Typography>
                            {errorProtect}
                        </Alert>}

                        <div className='flex mt-3 gap-3 items-center'>
                        {!loadingProtect && sendEmail && <div onClick={protectMyEmail}><IExecButton>Protect Data</IExecButton></div>}
                        {!loadingProtect && !sendEmail && <div onClick={protectMyFile}><IExecButton>Protect Data</IExecButton></div>}
                        </div>
                       

                        {loadingProtect && <CircularProgress sx={{ display: 'block', margin: '20px auto' }}></CircularProgress>}
                    </Box>
                </div>
            </div>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default ProtectData;