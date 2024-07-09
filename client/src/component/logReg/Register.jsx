import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Register = () => {

    const nav = useNavigate()
        const [user, setUser] = useState({
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:''
        })

        const changeHandler = (e) => {
            setUser({...user, [e.target.name]:e.target.value })
        }

        const submitHandler = (e) => {
            e.preventDefault(); 
            axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) => {
                console.log(res);
                setUser("");
                nav("/");
                
            })
            .catch((err) => {
                console.log(err);
            })
        }

    return (

        <form onSubmit={ submitHandler } className='AjouterUtilisateur'>
            <div className='regestrationDiv'>
                <div className='ajouterMsg'>
                    Register
                </div>
                <div className='detailsUtilisateur'>
                    <label>First Name</label>
                    <input type='text' onChange={changeHandler} defaultValue={""} name='firstName' className='UtilisateurInput' />
                </div>
                <div className='detailsUtilisateur'>
                    <label>Last Name</label>
                    <input type='text' onChange={changeHandler}  name='lastName' className='UtilisateurInput'/>
                </div>
                <div className='detailsUtilisateur'>
                    <label>Email</label>
                    <input type='text' onChange={changeHandler} value={user.email} name='email' className='UtilisateurInput'/>
                </div>
                <div className='detailsUtilisateur'>
                    <label>Password</label>
                    <input type='password' onChange={changeHandler} value={user.password} name='password' className='UtilisateurInput'/>
                </div>
                <div className='detailsUtilisateur'>
                    <label>Confirm PW</label>
                    <input type='password' onChange={changeHandler} value={user.confirmPassword} name='confirmPassword' className='UtilisateurInput'/>
                </div>
                <div>
                    <button type='submit'  className='login-button'>Register</button>
                </div>
            </div>
            <div className='loginDiv'></div>
            
        </form>
    )
}

export default Register