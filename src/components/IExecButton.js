import React from 'react';

const IExecButton = (props) => {

    return (
        <div className='inline-block'>
            <button className='bg-amber-400 border border-amber-400 px-4 py-2 text-black hover:bg-transparent hover:border-black cursor-pointer
                text-sm font-semibold rounded-xl transition duration-200'>
                {props.children}
            </button>
        </div>

    );
}

export default IExecButton;