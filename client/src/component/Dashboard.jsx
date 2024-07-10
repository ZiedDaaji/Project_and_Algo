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

    const [actionsList, setActionsList] = useState([]);



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

    /*function actions(props) {
        
        if (user === props) {
            const action1 = <div>
                            <Link to={`/view/${props}`}>View</Link>
                            <Link to={`/dashboard`}>add</Link>
                            <Link to={`/edit/${props}`}>edit</Link>
                            <Link onClick={ () => deleteJob(props)}>cancel</Link>
                        </div>;

            
            
            setActionsList(action1);
            
        }else
            setActionsList("action2");
            }*/


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
    


    return (
        <form>
            <div>
                <div>
                    <div>Welcome {userFN}!</div>
                    <div className='navigationFont'>
                        <Link onClick={ logOut }>Logout</Link>
                    </div>
                </div>
                
                <div className='navigationFont'>
                <Link to={`/addJob`}>Add A Job</Link>
                </div>
            </div>
            <div>
            <table className='my-table2'>
                <thead>
                    <tr>
                        <th>Job</th>
                        <th>Location</th>
                        <th>Posted by</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                        {jobs.map( job => {
                            
                    return (
                            <tr key={job._id} >
                                <td>{job.title}</td>
                                <td>{job.location}</td>
                                <td>{job.postedBy}</td>
                                <td>
                                    <div>
                                        <Link to={`/view/${job._id}`}>View</Link>
                                        <Link to={`/dashboard`}>add</Link>
                                        <Link to={`/edit/${job._id}`}>edit</Link>
                                        <Link onClick={ () => deleteJob(job._id)}>cancel</Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>


        </form>
    )
}

export default Dashboard