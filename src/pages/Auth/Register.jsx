import React, { useState,useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

// firebase
import {auth} from '../../firebase';
import { sendSignInLinkToEmail } from "firebase/auth";

import {useSelector } from "react-redux";

// toast
import {toast} from 'react-toastify';


const Register = () => {
  const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    if(user && user.token) {
        navigate("/");
    }

},[navigate, user])

  const handleSubmit = async (e) => {
    //
    console.log("handleSubmit is called")

    // this will prevent the page from reloading
    e.preventDefault();
    const config = {
        url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
    }
    // the link will be send to the email provided by the user
    await sendSignInLinkToEmail(auth,email, config);
    window.localStorage.setItem("emailForSignIn", email);
    toast.success(`Email is send to ${email}. Click the link to complete your registration.`)

    setEmail('')
  };

  return (
    <div className="container p-5 ">
      {/* 12 rows max */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4> Welcome To MiMi-Ecomerce</h4>
         
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="enter your email here"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
              <Button
                type="submit"
                color="success"
                variant="contained"
                className="btn "
                onClick={handleSubmit}
                style={{backgroundColor: '#0b2cbf', color: 'white', marginTop: 5}}
              >
               Register
              </Button>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
