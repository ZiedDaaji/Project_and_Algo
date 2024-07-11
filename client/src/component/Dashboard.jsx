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
    let myList = []
    let cookieJobList = Cookies.get('allJobs');

    let [newAllJobs,setNewAllJobs] = useState([]);
    let [allJobsList, setAllJobsList] = useState([]);
    
    let newMyJobs = Cookies.get('myJobs');

    if (newMyJobs !== undefined) {
        myList = JSON.parse(newMyJobs) || [];
        console.log(myList)
    }


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
            
            if (cookieJobList === undefined) {
                let allJobsString = JSON.stringify(res.data);
                Cookies.set('allJobs', allJobsString);
                newAllJobs = Cookies.get('allJobs');
                setAllJobsList((JSON.parse(newAllJobs) || []));
            }else{
                newAllJobs = Cookies.get('allJobs');
                setAllJobsList((JSON.parse(newAllJobs) || []));
            }

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
            Cookies.remove('allJobs');
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
            myList.push(props);
            let myJobsString = JSON.stringify(myList);
            Cookies.set('myJobs', myJobsString);
            let newMyJobs = Cookies.get('myJobs');
            myList = (JSON.parse(newMyJobs) || []);
            //
            let index = allJobsList.findIndex(one => one._id === props._id);
            console.log(index)
            allJobsList.splice(index, 1);
            let allJobsString = JSON.stringify(allJobsList);
            Cookies.set('allJobs', allJobsString);
            let newAllJobs = Cookies.get('allJobs');
            allJobsList = (JSON.parse(newAllJobs) || []);
        }
        function removeJob(props) {
            deleteJob(props._id);
            let index = myList.findIndex(one => one._id === props._id);
            console.log(index)
            myList.splice(index, 1);
            let myJobsString = JSON.stringify(myList);
            Cookies.set('myJobs', myJobsString);
            let newMyJobs = Cookies.get('myJobs');
            myList = (JSON.parse(newMyJobs) || []);
            //
        }
        function cancel(props) {
            deleteJob(props._id);
            let index = allJobsList.findIndex(one => one._id === props._id);
            console.log(index)
            allJobsList.splice(index, 1);
            let allJobsString = JSON.stringify(allJobsList);
            Cookies.set('allJobs', allJobsString);
            let newAllJobs = Cookies.get('allJobs');
            allJobsList = (JSON.parse(newAllJobs) || []);
            //
        }
        

        console.log(newAllJobs)
    console.log(allJobsList)

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
                            {allJobsList.map(job => {
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
                                                            <Link onClick={ () => cancel(job)}>cancel</Link>
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
                        {myList.map(job => {
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