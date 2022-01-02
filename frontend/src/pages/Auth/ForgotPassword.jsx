import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { sendPasswordResetEmail } from "firebase/auth";


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state) => ({...state}))

    let navigate = useNavigate();

    useEffect(() => {
        if(user && user.token) {
            navigate("/");
        }

    },[navigate, user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url:process.env.REACT_APP_RESET_PASSWORD,
            handleCodeInApp: true,
        }

        await sendPasswordResetEmail(auth, email, config)
        .then((res) => {
            toast.success("A link has been sent. Plese check your email")
            setEmail('');
            console.log(res)
            
        })
        .catch((error) => {
            toast.error("something went wrong. Please try again")
            setLoading(false);
        })
        
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}> 
                <input
                 type="email" 
                 className="form-control"
                  value={email}
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus />
                  <br/> 
                  <button className=" btn btn-raised" style={{backgroundColor: 'blue', color: 'white'}} disabled={!email} > Get a link</button>
            </form>
        </div>
    )

}

export default ForgotPassword


