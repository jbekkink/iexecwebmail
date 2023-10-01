import React, { useEffect } from 'react';

const Layout = (props) => {

    return (
        <div className='bg-white overflow-hidden flex gap-6 min-h-screen w-full'>
            {props.children}
        </div>
    );
}

export default Layout;