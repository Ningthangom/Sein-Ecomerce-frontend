
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";


// redux component
import { useDispatch, useSelector } from "react-redux";

// firebase
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  getIdTokenResult,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// toast
import { toast } from "react-toastify";

import {createOrUpdateUser} from '../../connectBackend/auth';

const TestLogin = () => {
    const [email, setEmail] = useState("ningthangom@gmail.com");
    const [password, setPassword] = useState("987654321");
    const [loading, setLoading] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
  
    const { user } = useSelector((state) => ({ ...state }));
    const {state} = useLocation();
    console.log("that from uselocation: ", state)
  
  
    const provider = new GoogleAuthProvider();
    
   let navigate = useNavigate();
  
   
    const dispatch = useDispatch();
  
    useEffect(() => {
      let intended = state;
      if(intended) {
        return;
      }else {
        if (user && user.token) {
          navigate("/")
          
         }
      }
    }, [navigate, user]);
  
      // redirect users based on role
    const roleBaseRedirect = (res, navigate) => {
      /* console.log("roleBaseRedirect is called") */
      let intended = state;
      if(intended) {
        navigate(`/${intended}`)
      }else {
        if(res.data.role === 'admin'){
          navigate("/admin/dashboard");
          }else{
          /* console.log("rolebased redirect was called",window.history.state ) */
            navigate("/user/history");  
          }
      }
  
   
    }
  
    const handleSubmit = async (e) => {
      //
      console.log("handleSubmit is called")
      e.preventDefault();
      setLoading(true);
  
      if (!email || !password) {
        toast.error("Email and password is required");
        return;
      }
  
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
  
     /*  console.log("email and password", email, password); */
      if(checkbox === true) {
        
      }
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
     /*    console.log(result); */
  
        const { user } = result;
       /*  console.log("this is user detail: ", user); */
        const idTokenResult = await getIdTokenResult(user);
        /* toast.success("login successful"); */
       /*  console.log(idTokenResult.token); */
  
        // calling function to send token to backend
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // this res is coming back from the backend
            console.log("res coming back from the backend after login", res.data);
            // send the data to redux state
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                shippingInfo: res.data.shippingInfo
  
              },
            });
            roleBaseRedirect(res, navigate);
          })
          .catch((err) => {
            console.log("sending token to backend did not work", err);
            setLoading(false);
          });
  
        // production
        /*  setEmail('');
          setPassword(''); */
      } catch (err) {
        console.log(err);
        toast.error("something went wrong. Please try again");
        setLoading(false);
      }
    };
    
   


    const googleLogin = async () => {
      console.log("google login");
      await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          /* const credential = GoogleAuthProvider.credentialFromResult(result); */
          /*  const idTokenResult = credential.accessToken; */
          // The signed-in user info.
          let userDetail = result.user;
          console.log("this is user detail: ", userDetail);
          const idTokenResult = userDetail.accessToken;
          /* console.log(idTokenResult); */
  
          // ...
          createOrUpdateUser(idTokenResult)
          .then((res) => {
            // this res is coming back from the backend
            console.log("res coming back from the backend", res);
            // send the data to redux state
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult,
                role: res.data.role,
                _id: res.data._id
              },
            });
            roleBaseRedirect(res, navigate);
          })
          .catch((err) => {
            console.log("sending token to backend did not work", err);
          });
        })
        .catch((error) => {
          // Handle Errors here.
          // The email of the user's account used.
          // The AuthCredential type that was used.
        console.log(error);
          // ...
        });
    };
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `linear-gradient(lightblue, grey)`,
        position: "relative",
        height: window.innerHeight,
        alignContent: "center"
      }}
    >
      <div className="row">
        <div className="col-md-3"></div>
        <div
          className="col-md-6 "
          style={{
            marginTop: 50,
            border: "solid 2px red",
            backgroundImage: "linear-gradient(grey,lightgreen)",
            borderRadius: "2%",
            alignContent: "center"
          }}
        >
          <form onSubmit={handleSubmit} style={{ alignContent: "center"}}>
            <h3
              style={{
                alignContent: "center",
                textAlign: "center",
                marginTop: 20,
                fontFamily: "'Abril Fatface', cursive"
              }}
            >
              Welcome to Sein
            </h3>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder=" password"
                style={{ marginTop: 5 }}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>

            <button  onClick={handleSubmit}
              className="btn btn-dark btn-lg btn-block mt-2 mb-2"
              disabled={loading}>
              Sign in
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#" onClick={()=> navigate('/forgot/password')}>password?</a>
            </p>
            <p style ={{ textAlign: 'center' }}> OR </p>
          </form>
          <button  
            className="btn btn-red btn-lg btn-block mt-2"
             onClick={googleLogin}
            >
              google sign in
            </button>
            <button  
            className="btn btn-blue btn-lg btn-block mt-2 mb-4"
             onClick={() => navigate('/register')}
            >
              create new account
            </button>
        </div>
        <div
          style={{
            position: "relative",
            bottom: "40%",
            textAlign: "center",
            fontSize: 30,
            fontFamily: "Droid Sans",
            marginTop: "10px",
          }}
        >
          “Happiness is not in money, but in shopping.”
          {"\n"}
          <br />
           ‒ Marilyn Monroe.
        </div>
      </div>
    </div>
  );
};

export default TestLogin;
