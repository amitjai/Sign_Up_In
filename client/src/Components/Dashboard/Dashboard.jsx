import React from 'react';
import './Dashboard.css';
import boy from '../assets/boy.png';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { user } = useSelector(state => state.user);
  return (
    <div className='dashboard'>
      <div className="dashboard-box">
        <h1>Dashboard</h1><br />
        <img src={boy} alt="" />
        <h2>{`Hello ${user?.username}`}</h2>
        <h2>{`Email: ${user?.email}`}</h2>
      </div>
    </div>
  )
}

export default Dashboard