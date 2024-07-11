import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


const ViewJob = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [job, setJob] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [date, setDate] = useState("");
  const nav = useNavigate();
  const {id} = useParams();
  let newList = [];
  let cookieJobList = Cookies.get('allJobs');
  let allJobsList = (JSON.parse(cookieJobList) || []);
  console.log(allJobsList)

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
        setJob(res.data);
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
        Cookies.remove('myJobs');
        Cookies.remove('allJobs');
        nav("/");
    })
    .catch((err) => {
        console.log(err); 
    })
    
}


  function addList(props) {
        let cookieMyList = Cookies.get('myJobs');
        console.log(cookieMyList)
        
        if (cookieMyList === undefined) {
          newList.push(props)
          let allMyJobsString = JSON.stringify(newList);
          Cookies.set('myJobs', allMyJobsString);
          //
          let index2 = allJobsList.findIndex(one => one._id === props._id);
          console.log(index2)
          allJobsList.splice(index2, 1);
          let allJobsString = JSON.stringify(allJobsList);
          Cookies.set('allJobs', allJobsString);
          console.log(allJobsList)          
        }else{
          let parseCookieMyList = JSON.parse(cookieMyList) || [];
          parseCookieMyList.push(props);
          console.log(parseCookieMyList)
          let allMyJobsString = JSON.stringify(parseCookieMyList);
          Cookies.set('myJobs', allMyJobsString);
          //
          console.log(cookieJobList)
          console.log(allJobsList)
          let index2 = allJobsList.findIndex(one => one._id === props._id);
          console.log(index2)
          allJobsList.splice(index2, 1);
          let allJobsString = JSON.stringify(allJobsList);
          Cookies.set('allJobs', allJobsString);
          console.log(allJobsList)
        }
        nav('/dashboard');
}


  return (
    <form>
      <div className='viewNavBar'>
        <div><Link to={`/dashboard`}>Back</Link></div>
        <div><Link onClick={ logOut }>Logout</Link></div>
      </div>
      <div className='viewBody'>
        <p>{title}</p>
        <div className='jobDetailsDiv'>
          <div>{description}</div>
          <div>Location : {location} </div>
          <div>Posted by : {postedBy}</div>
          <div>Posted on : {date}</div>
        </div>
      </div>
      <div className='addJob-Button'>
        <Link to={`/dashboard`}onClick={ () => addList(job)} >Add To My Jobs</Link>
      </div>
      
    </form>
  )
}

export default ViewJob