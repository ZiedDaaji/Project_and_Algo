import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditJob = () => {
  const [allUsers, setAllUsers] = useState([]);
  const nav = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [date, setDate] = useState("");
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
        nav('/');
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

useEffect(() => {
  axios.get("http://localhost:8000/api/Jobs/" + id)
  .then((res) => {
      console.log(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setLocation(res.data.location);
      setPostedBy(res.data.postedBy);
      setDate(res.data.date);
  })
  .catch((err) => {
      console.log(err)
  })
}, [id])

const updateHandler = (e) => {
  e.preventDefault();   
  axios.patch("http://localhost:8000/api/Jobs/"+id, {
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
      setPostedBy("");
      setDate("");
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
    <form onSubmit={ updateHandler }>
      <div className='editNavBar'>
        <div><Link to={`/dashboard`}>Back</Link></div>
        <div><Link onClick={ logOut }>Logout</Link></div>
      </div>
      <div className='editBody'>
        <p>Edit Your Job Posting</p>
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

export default EditJob