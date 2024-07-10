import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ViewJob = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [date, setDate] = useState("");
  const nav = useNavigate();
  const {id} = useParams();

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


  return (
    <form>
      <div>
        <div>Edit Your Job Posting</div>
        <div>
          <div><Link to={`/dashboard`}>Back</Link></div>
          <div><Link onClick={ logOut }>Logout</Link></div>
        </div>
      </div>
      <div>
        <div>{description}</div>
        <div>Location : {location} </div>
        <div>Posted By : {postedBy}</div>
        <div>Posted on : {date}</div>
      </div>
      <div>
      <Link >Add To My Jobs</Link>
      </div>
      
    </form>
  )
}

export default ViewJob