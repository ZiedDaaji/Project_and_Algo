import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

const AddJob = () => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  const currentMonthName = months[currentMonth];
  const toDay = currentMonthName + " " + currentDay+ ", " + currentYear
  const [allUsers, setAllUsers] = useState([]);
  const userFN = Cookies.get('FN');
  const userLN = Cookies.get('LN');
  const user = `${userFN + " " + userLN}`
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const postedBy = `${user}`;
  const date = `${toDay}`
  const [errors, setErrors] = useState([]);


    useEffect(() =>{
      axios.get('http://localhost:8000/api/AllUsers', {withCredentials: true})
      .then((res) => {
          setAllUsers(res.data);
      })
      .catch((err) => {
          console.log(err);
          nav('/')
      })
  }, []);

  const logOut = () => {
    axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
    .then((res) => {
        console.log(res);
        Cookies.remove('FN');
        Cookies.remove('LN');
        nav("/");
    })
    .catch((err) => {
        console.log(err); 
    })
    
}

const submitHandler = (e) => {
  e.preventDefault();   
  axios.post("http://localhost:8000/api/Jobs", {
    title,
    description,
    location,
    postedBy,
    date
  })
  .then((res) => {
      console.log(res.data)
      setTitle("");
      setDescription("");
      setLocation("");
      nav("/dashboard");
  })
  .catch(err=>{
      const errorResponse = err.response.data.errors;
      const errorArr = [];
      for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
      }
      setErrors(errorArr);
  })
  
}

  return (
    <form onSubmit={ submitHandler }>
      <div>
        <div>Add a Job</div>
        <div>
          <div><Link to={`/dashboard`}>Back</Link></div>
          <div><Link onClick={ logOut }>Logout</Link></div>
        </div>
      </div>
      <div className='autorisation'>
                <div className='autorisation-email'>
                    <label>Title </label>
                    <input className='log-input' type='text' onChange={(e) => {setTitle(e.target.value)}} value={title} name='email' />
                </div>
                <div className='autorisation-password'>
                    <label>Description</label>
                    <input className='log-input' type='text' onChange={(e) => {setDescription(e.target.value)}} value={description} name='password' />
                </div>
                <div className='autorisation-password'>
                    <label>Location</label>
                    <input className='log-input' type='text' onChange={(e) => {setLocation(e.target.value)}} value={location} name='password' />
                </div>
                <div className='autorisation-submit'>
                    <button className='login-button' type='submit'>Submit</button>
                </div>
            </div>
    </form>
    
  )
}

export default AddJob