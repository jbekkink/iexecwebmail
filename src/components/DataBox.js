import React, { useEffect } from 'react';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const DataBox = (props) => {

    return (
        <div className={`bg-gradient-to-r text-white rounded-lg shadow-sm hover:shadow-md ${props.bg} 
        cursor-pointer h-48 transition duration-200 ease-in-out relative transform hover:-translate-y-1 hover:scale-101`}>
            <div className='absolute bottom-2 w-full'>
                <div className='relative flex justify-between items-center px-4'>
                    <div>
                        <h3 className=' text-3xl tracking-wide'>{props.title}</h3>
                    </div>
                    <div>
                        {props && props.email && <AlternateEmailOutlinedIcon className='text-3xl'/>}
                        {props && !props.email && <DescriptionOutlinedIcon className='text-3xl'/>}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DataBox;






