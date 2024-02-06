import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
  }
  const inputEvents = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }
  const userSubmit = async () => {
    try {
      const res = await axios.post("/login", userInput);
      if (res.data.success) {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        alert(res.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login'>
      <div className="login-box">
        <h1>Welcome Back, Log in</h1>
        <p>Hi,we are glad you are back. Please login</p>
        <form action="post" onSubmit={onSubmit}>
          <div className="input-block">
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Email' name='email' onChange={inputEvents} value={userInput.email} />
          </div>
          <div className="input-block">
            <label htmlFor="">Password</label>
            <div className="show">
              <input type={!show ? "password" : "text"} placeholder='Password' name='password' onChange={inputEvents} value={userInput.password} />
              <button onClick={() => setShow(!show)}>{!show ? "Show" : "Hide"}</button>
            </div>
          </div><br />
          <button className='btn' onClick={userSubmit}>Sign In</button>
        </form>
        <p>Don't have an Account? <NavLink to="/register">Sign up</NavLink></p>
      </div>
    </div>
  )
}

export default Login