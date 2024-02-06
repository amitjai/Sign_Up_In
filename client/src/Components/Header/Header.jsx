import React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import './Header.css';

function Header() {
  return (
    <div className='header'>
      <div className="header-box">
        <h1><a href="/">LogBlock</a></h1>
        <Avatar sx={{ bgcolor: deepOrange[500], cursor: 'pointer' }}>A</Avatar>
      </div>
    </div>
  )
}

export default Header;