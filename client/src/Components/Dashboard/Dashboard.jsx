import React, { useEffect } from 'react';
import './Dashboard.css';
import boy from '../assets/boy.png';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/Slices/userSlice';

function Dashboard() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const Dashboardvalid = async () => {

    try {
      const res = await axios.get('/get_user_info', {
        token: localStorage.getItem('token'),
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      if (res.data.success) {
        console.log(res.data);
        dispatch(getUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to='/login' />
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      Dashboardvalid();
    }
  }, [user, Dashboardvalid]);

  return (
    <div className='dashboard'>
      <div className="dashboard-box">
        <h1>Dashboard</h1><br />
        <img src={boy} alt="" />
        <h2>{`Hello ${user.username}`}</h2>
        <h2>{`naveen1234@gmail.com`}</h2>
      </div>
    </div>
  )
}

export default Dashboard