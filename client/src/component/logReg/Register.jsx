import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Register = () => {

    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");
    const [error4, setError4] = useState("");
    const [error5, setError5] = useState("");
    const [errors, setErrors] = useState([]);

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

            if (err.response.data.error.errors.firstName !== undefined) {
                setError1(err.response.data.error.errors.firstName.message);
            }else{
                setError1("");
            }
            if (err.response.data.error.errors.lastName !== undefined) {
                setError2(err.response.data.error.errors.lastName.message);
            }else{
                setError2("");
            }
            if (err.response.data.error.errors.email !== undefined) {
                setError3(err.response.data.error.errors.email.message);
            }else{
                setError3("");
            }
            if (err.response.data.error.errors.password !== undefined) {
                setError4(err.response.data.error.errors.password.message);
            }else{
                setError4("");
            }
            if (err.response.data.error.errors.confirmPassword !== undefined) {
                setError5(err.response.data.error.errors.confirmPassword.message);
            }else{
                setError5("");
            }
            
        })
    }

    return (

        <form onSubmit={ submitHandler } className='register'>
                <div className='Reg-title'>
                    Register
                </div>
                <div className='userDetails'>
                    <label>First Name</label>
                    <input type='text' onChange={changeHandler} name='firstName' className='regInput' />
                    
                </div>
                <div className='errors'>{error1}</div>
                <div className='userDetails'>
                    <label>Last Name</label>
                    <input type='text' onChange={changeHandler}  name='lastName' className='regInput'/>
                </div>
                <div className='errors'>{error2}</div>
                <div className='userDetails'>
                    <label>Email</label>
                    <input type='text' onChange={changeHandler} value={user.email} name='email' className='regInput'/>
                </div>
                <div className='errors'>{error3}</div>
                <div className='userDetails'>
                    <label>Password</label>
                    <input type='password' onChange={changeHandler} value={user.password} name='password' className='regInput'/>
                </div>
                <div className='errors'>{error4}</div>
                <div className='userDetails'>
                    <label>Confirm PW</label>
                    <input type='password' onChange={changeHandler} value={user.confirmPassword} name='confirmPassword' className='regInput'/>
                    
                </div>
                <div className='errors'>{error5}</div>
                <div className='ButtonDiv'>
                    <button type='submit'  className='register-button'>Register</button>
                </div>
        
        </form>
    )
}

export default Register