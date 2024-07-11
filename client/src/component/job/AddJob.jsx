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
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  
  

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
        Cookies.remove('myJobs');
        Cookies.remove('allJobs');
        nav("/");
    })
    .catch((err) => {
        console.log(err); 
    })
    
}

function addList(props) {

  let cookieJobList = Cookies.get('allJobs');
  let parseCookieJobList = JSON.parse(cookieJobList) || [];
  parseCookieJobList.push(props);
  let allJobsString = JSON.stringify(parseCookieJobList);
  Cookies.set('allJobs', allJobsString);

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
      addList(res.data)
      setTitle("");
      setDescription("");
      setLocation("");
      nav("/dashboard");
  })
  .catch(err=>{
    console.log(err.response.data.errors)
    if (err.response.data.errors.title !== undefined) {
      setError1(err.response.data.errors.title.message);
    }else{
      setError1("");
    }
    if (err.response.data.errors.description !== undefined) {
      setError2(err.response.data.errors.description.message);
    }else{
      setError2("");
    }
    if (err.response.data.errors.location !== undefined) {
      setError3(err.response.data.errors.location.message);
    }else{
      setError3("");
    }
  })
}
  return (
    <form onSubmit={ submitHandler } >
      <div className='addNavBar'>
        <h4>Add a Job</h4>
        <div className='subNavBar'>
          <div><Link to={`/dashboard`}>Back</Link></div>
          <div><Link onClick={ logOut }>Logout</Link></div>
        </div>
      </div>
      <div className='addBody'>
        <div className='titleAdd'>
          <label className='label'>Title </label>
          <input className='title-input' type='text' onChange={(e) => {setTitle(e.target.value)}} value={title} name='title' />
          <div className='errors'>{error1}</div>
        </div>
        <div className='descriptionAdd'>
          <label className='label'>Description</label>
          <textarea className='description-input' onChange={(e) => {setDescription(e.target.value)}} value={description} name='location'/>
          <div className='errors'>{error2}</div>
        </div>
        <div className='locationAdd'>
          <label className='label'>Location</label>
          <input className='location-input' type='text-area' onChange={(e) => {setLocation(e.target.value)}} value={location} name='location' />
          <div className='errors'>{error3}</div>
        </div>
        <div className='submit'>
            <button className='login-button' type='submit'>Submit</button>
        </div>
      </div>
    </form>
    
  )
}

export default AddJob