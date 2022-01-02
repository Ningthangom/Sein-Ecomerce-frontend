import React, {useState}from 'react';
import UserNav from './UserNav';
import {auth} from '../../../firebase';
import {useNavigate} from 'react-router-dom'

import {toast} from "react-toastify";
import { updatePassword } from "firebase/auth";



const Password = () => {
        const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(false);

        const navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
          /*   console.log(password); */
            const user = auth.currentUser;

           /*  console.log(user); */
            const newPassword = password;

           await updatePassword(user, newPassword)
           .then(() => {
            // Update successful.
            setLoading(false);
            toast.success("Password updated successfully");
            navigate('/user/history')
           

            }).catch((error) => {
            // An error ocurred
            setLoading(false);
            toast.error("Something went wrong")
            });

        }   

        const passwordUpdate = () => (
            
            <form onSubmit={handleSubmit}> 
            <div className="form-group">
                <lable>Your Password</lable>
                <input
                 type="password" 
                 className="form-control"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 placeholder="Enter new password"/>
                 <button className="btn btn-primary" disabled={loading || !password || password.length < 6}> submit</button>
            </div>
         </form>

        )
               

    return (
        <div className=" container-fluid "> 
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading....</h4> : <h4>Password Upadate</h4>}
                    
                    {passwordUpdate()}
                   
                </div>

            </div>

        </div>
    )
}

export default Password;