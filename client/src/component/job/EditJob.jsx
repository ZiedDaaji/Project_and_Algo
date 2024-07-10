import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditJob = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const nav = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [date, setDate] = useState("");


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
      const errorResponse = err.response.data.errors;
      const errorArr = [];
      for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
      }
      setErrors(errorArr);
  })
}


  return (
    <form onSubmit={ updateHandler }>
      <div>
        <div>Edit Your Job Posting</div>
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

export default EditJob