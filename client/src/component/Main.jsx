import React from 'react';
import Register from './logReg/Register';
import Login from './logReg/Login';

const Main = () => {
    return (
        <div>
            <div>
                <h1>Welcome to Chore Tracker</h1>
            </div>
            <div>
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