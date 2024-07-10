import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const Login = () => {
    const [error, setError] = useState("");
    const nav = useNavigate();
    
        const [userLogin, setUserLogin] = useState({
            email:'',
            password:''
        })

        const changeHandler = (e) => {
            setUserLogin({...userLogin, [e.target.name]:e.target.value }) 
        }
        
        const loginHandler = (e) => {
            
            e.preventDefault(); 
            axios.post('http://localhost:8000/api/Login', userLogin, {withCredentials:true})
            .then((res) => {
                console.log(res.data);
                Cookies.set('FN', (res.data.user.firstName), {expiresIn: '2h'});
                Cookies.set('LN', (res.data.user.lastName), {expiresIn: '2h'});
                nav('/dashboard')
            })
            
            .catch((err) => {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            })
            
        }
        
        
    return (
        <form onSubmit={ loginHandler } className='login'>
            <div className='login-title'>
                Login
            </div>
            
                <div className='userDetails'>
                    <label>Email </label>
                    <input className='logInput' type='text' onChange={changeHandler} value={userLogin.email} name='email' />
                </div>
                <div className='userDetails'>
                    <label>Password</label>
                    <input className='logInput' type='password' onChange={changeHandler} value={userLogin.password} name='password' />
                </div>
                <div className='ButtonDiv'>
                    <button className='login-button' type='submit'>Login</button>
                </div>
            

            <div>
                <div className='errors'>
                    {error}
                </div>
            </div>
        </form>
    )
}

export default Login

