import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';


const Dashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const nav = useNavigate();
    const userFN = Cookies.get('FN');
    const userLN = Cookies.get('LN');
    const user = `${userFN + " " + userLN}`
    const [jobs, setJobs] = useState([]);
    const [myJobs, setMyJobs] = useState([]);
    const [storedMyJobs, setStoredMyJobs] = useState([]);


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

    useEffect(() =>{
        axios.get('http://localhost:8000/api/Jobs')
        .then((res) => {
            console.log(res.data);
            setJobs(res.data);
            
            
        })
        .catch((err) => {
            console.log(err);
            nav('/dashboard');
        })
    }, []);

    const logOut = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then((res) => {
            console.log(res);
            Cookies.remove('FN');
            Cookies.remove('LN');
            Cookies.remove('myJobs');
            nav("/");
        })
        .catch((err) => {
            console.log(err); 
        })
        
    }

    const deleteJob = (thisId) => {
        axios.delete(`http://localhost:8000/api/Jobs/${thisId}`)
            .then((response) => {
                const newJobList = jobs.filter(
                    (job, index) => job._id !== thisId
                );
                setJobs(newJobList);

            })
            .catch((err) => {
                console.log(err);
                console.log("failed2");

            })
        };

        function addList(props) {
            myJobs.push(props);
            jobs.pop(props);
            let myJobsString = JSON.stringify(myJobs);
            console.log(myJobsString)
            Cookies.set('myJobs', myJobsString);
        }
        function removeJob(props) {
            myJobs.pop(props._id);
            deleteJob(props._id);
            let myJobsString = JSON.stringify(myJobs);
            console.log(myJobsString)
            Cookies.set('myJobs', myJobsString);
        }

        

    return (
        <form>
            <div className='navBar'>
                <div className='subNavBar'>
                    <div>Welcome {userFN}!</div>
                    <div >
                        <Link onClick={ logOut }>Logout</Link>
                    </div>
                </div>
                
                <div className='addLink'>
                    <Link to={`/addJob`}>Add A Job</Link>
                </div>
            </div>
            <div className='DashboardBody'>
                <div className='JobLitst'>
                    <table className='Table1'>
                        <thead className='thead'>
                            <tr>
                                <th>Job</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {jobs.map(job => {
                                    if (user === job.postedBy) {
                                        return (
                                            <tr key={job._id} >
                                                <td>{job.title}</td>
                                                <td>{job.location}</td>
                                                <td>
                                                    <div className='actionsList'>
                                                        <div className='actionsList1'>
                                                            <Link to={`/view/${job._id}`}>View</Link>
                                                            <Link onClick={ () => addList(job)}>add</Link>
                                                        </div>
                                                        <div className='actionsList2'>
                                                            <Link to={`/edit/${job._id}`}>edit</Link>
                                                            <Link onClick={ () => deleteJob(job._id)}>cancel</Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return (
                                            <tr key={job._id} >
                                                <td>{job.title}</td>
                                                <td>{job.location}</td>
                                                <td>
                                                    <div className='actionsList'>
                                                        <div className='actionsList1'>
                                                            <Link to={`/view/${job._id}`}>View</Link>
                                                            <Link onClick={ () => addList(job)}>add</Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='MyLitst'>
                    <div className='DivTitle'>My List</div>
                    <div className='myListBody'>                
                        {storedMyJobs.map(job => {
                            return (
                                <div className='myJobLine'  key={job._id}>
                                    <div>{job.description}</div>
                                    <div className='actionsList2'>
                                        <Link to={`/view/${job._id}`}>View</Link>
                                        <Link onClick={ () => removeJob(job)}>Done</Link>
                                    </div>
                                </div>
                                );
                            })
                        }
                    </div>    
                </div>
            </div>
        </form>
    )
}

export default Dashboard