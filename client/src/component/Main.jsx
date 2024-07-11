import React, { useEffect } from 'react'
import Register from './logReg/Register';
import Login from './logReg/Login';
import Cookies from 'js-cookie';

const Main = () => {

    useEffect(() =>{
        Cookies.remove('FN');
        Cookies.remove('LN');
        Cookies.remove('myJobs');
        Cookies.remove('allJobs');
        Cookies.remove('userToken');
    }, []);

        


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