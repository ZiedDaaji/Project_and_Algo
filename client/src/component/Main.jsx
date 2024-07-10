import React from 'react';
import Register from './logReg/Register';
import Login from './logReg/Login';

const Main = () => {
    return (
        <div className='main'>
            <div className='mainHeader'>
                <h1>Welcome to Chore Tracker</h1>
            </div>
            <div className='mainBody'>
                <div>
                    <Register/>
                </div>
                <div>
                    <Login/>
                </div>
            </div>
            
            
        </div>
    )
}

export default Main