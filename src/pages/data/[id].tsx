import React, { useEffect } from "react";
import {useRouter} from "next/router"; 
import { useState } from "react";
import Overview from "@/components/Overview";
import Access from "@/components/Access";
import Addresses from "@/components/Addresses";

const colors = [
  'from-indigo-400 to-purple-400 ', 
  'from-emerald-400  to-cyan-400 ', 
  'from-fuchsia-400 to-pink-300 ',
  'from-red-300 to-orange-300 ',
  'from-orange-300 to-amber-300 ',
  'from-blue-300 to-violet-300 ',
  'from-indigo-300 to-purple-400',
  'from-green-400 to-teal-300 '
  ];

function shortAddress(address:string): string {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

//timestamp to date
function timestampToDate(timestamp: string): string {
  const date = new Date(Number(timestamp)*1000);
  return date.toLocaleDateString();
}

export default function File () {
  const router = useRouter();
  const {id} = router.query;
  const {name, date, email, index} = router.query;
  const [title, setTitle] = useState('');
  const [refresh, setRefresh] = useState(false);


  return (
    <div className={`flex flex-col gap-6 p-6 w-full `}>
      <div className="flex flex-col gap-6 p-6 w-full">
              <div className='flex justify-between items-center'>
                  <div><h2 className="font-bold text-3xl">{name}</h2></div>
              </div>
              <div className="flex w-full flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className={`flex px-3 py-5 rounded-xl shadow-sm text-white flex-col gap-6 bg-gradient-to-b ${colors[Number(index) % 8]}`}>
                        <div>
                            <h3 className="text-xl">Name of data:</h3>
                            <p className="font-semibold">{name}</p>
                        </div>
                        <div>
                            <h3 className="text-xl">Upload date:</h3>
                            {date && <p className="font-semibold">{timestampToDate(date.toString())}</p>}
                        </div>
                        <div>
                            <h3 className="text-xl">Data type:</h3>
                            {email &&  <p className="font-semibold">email</p>}
                            {!email &&  <p className="font-semibold">file</p>}
                        </div>
                        <div>
                            <h3 className="text-xl">Address:</h3>
                            {id && <p className="font-semibold">{shortAddress(id.toString())}</p>}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-2/3 ">
                  {id && <Access address={id.toString()}  setRefresh={setRefresh}/>}
                </div>
              </div>  
              <div className="w-full">
                  {id && <Addresses address={id.toString()} refresh={refresh} setRefresh={setRefresh} />}
              </div>    
      </div>
    </div>

  )
}


