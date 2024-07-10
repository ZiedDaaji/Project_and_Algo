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
            <div className='ajouterMsg'>
                Login
            </div>
            <div className='autorisation'>
                <div className='autorisation-email'>
                    <label>Email </label>
                    <input className='log-input' type='text' onChange={changeHandler} value={userLogin.email} name='email' />
                </div>
                <div className='autorisation-password'>
                    <label>Password</label>
                    <input className='log-input' type='password' onChange={changeHandler} value={userLogin.password} name='password' />
                </div>
                <div className='autorisation-submit'>
                    <button className='login-button' type='submit'>Se connecter</button>
                </div>
            </div>

            <div>
                <div className='errorRes'>
                    {error}
                </div>
            </div>
        </form>
    )
}

export default Login

