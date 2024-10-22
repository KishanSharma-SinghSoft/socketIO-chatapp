import React from "react";
import { useSocket } from "../../customHooks/useSocket";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";

import "./Login.css";

export const LoginOneTOOne = ({
  room,
  setRoom,
  username,
  setUsername,
  setLoggedIn,
}) => {


  //function to login 
  const checkForLogin = (e) => {
    e.preventDefault();
    if (room == "" || username == "") {
      alert("fill the required fields");
    } else {
      setLoggedIn(true);
    
    }
  };

//function to register users

  const registerUser=(e)=>{
    e.preventDefault();
    if ( username == "") {
      alert("fill the required fields");
    } else {
      setLoggedIn(true);
      registerUserHandler()
    }
  
  }


  //method to post userdata 
  const registerUserHandler=async()=>{
    const response= axios.post(API_BASE_URL+"/register",{username:username});
    console.log(response.data)
  }

  return (
    <>
   
    <div className="login_root">
      
    
 
       
        <form onSubmit={registerUser} className="login_form">
        <input type="text" id="username" placeholder="Enter your username" required
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <button  type="submit">Register</button>
        <button  onClick={checkForLogin}>Login</button>
        </form>
     
        
  
    </div>
    </>
  );
};
