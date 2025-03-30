import React from 'react';

const AppContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='flex w-full max-w-[1200px]'>
            {children}
        </div>
    );
};

export {AppContainer};