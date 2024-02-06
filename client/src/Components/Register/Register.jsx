import React, { useState } from 'react';
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const inputEvents = (e) => {
    setUserInput({...userInput, [e.target.name]: e.target.value});
  };

  const userSubmit = async () => {
    const {username, email, password} = userInput;
    if(!username || !email || !password || username === '' || email === '' || password=== '') {
      return alert("All fields are required!");
    }
    try {
      
        const res = await axios.post("/register", userInput);
        if(res.data.success) {

          alert(res.data.message);
          navigate('/login');
        }
    } catch(error) {
      console.log(error);
    }
    
  };

  return (
    <div className='register'>
      <div className="register-box">
        <h1>Sign Up</h1>
        <p>We are glad that you will be using project Cloud to manage<br/> your tasks! We hope that you will get like it.</p>
        <form action="post" onSubmit={onSubmit}>
          <div className="input-block">
            <label htmlFor="">Username</label>
            <input type="text" placeholder='Username' name='username' onChange={inputEvents} value={userInput.username} />
          </div>
          <div className="input-block">
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Email' name='email' onChange={inputEvents} value={userInput.email} />
          </div>
          <div className="input-block">
            <label htmlFor="">Password</label>
            <div className="show">
              <input type={show ? "text" : "password"} placeholder='Password' name='password' onChange={inputEvents} value={userInput.password} />
              <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
            </div>
            
          </div><br />
          <button className='btn' onClick={userSubmit}>Sign Up</button>
        </form>
        <p>Already have an Account? <NavLink to="/login">Sign in</NavLink></p>
      </div>
    </div>
  )
}

export default Register