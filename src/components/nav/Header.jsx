
import React, {useState} from 'react';
import {  Menu  } from  'antd';
import { 
     ShopOutlined,
     LogoutOutlined,
     SettingOutlined,
     UserAddOutlined,
     UserOutlined } from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';


// toast
import {toast} from 'react-toastify';

// firbase 
import { getAuth, signOut } from "firebase/auth";

// media quries
import json2mq from "json2mq";
import useMediaQuery from "@mui/material/useMediaQuery";


// redux 
import {useDispatch, useSelector} from 'react-redux';
/* import SearchProduct from '../Forms/SearchProduct' */
import SearchProductMui from "../Forms/SearchProductMui"



const { SubMenu, Item } = Menu;


const Header = () => {

    const [current, setCurrent] = useState('home');
   /*  const [loading, setLoading] = useState(false) */
    let dispatch = useDispatch();
    let navigate = useNavigate();

    // this is how to get data from redux state
    let {user} = useSelector((state) => ({...state}));
    /* console.log(user); */


    const Logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("logout successful")
        }).catch((error) => {
          // An error happened.
          toast.error("something went wrong")
          console.log(error)
        });

        dispatch({
            type: "LOGGED_OUT",
            payload: null
        })

        navigate('/login');

    }
    
    const handleClick = (e) => {
        //
     /*    console.log(e.key); */

     setCurrent(e.key);

    }

     // media quries
  const matches = useMediaQuery(
    json2mq({
      minWidth: 500,
    })
  );

    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<ShopOutlined />}>
          <Link to="/">Store</Link>
        </Item>

        { user && (
        <SubMenu key="SubMenu"
         icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}// when you split a word it becomes an [], therefore [0]
           className="float-right" 
           style={{ position: "absolute", right: 0 }}
           >

          <Item icon={<UserOutlined />}>
            {user.role === 'admin' ? <Link to="/admin/dashboard" >Dashboard</Link> :<Link to="/user/history" >Dashboard</Link> }
          </Item>
          <Item icon={<LogoutOutlined /> } onClick={Logout}>Logout</Item>
        </SubMenu>)}
        
        {!user  && ( 
        <Item
          key="login"
          icon={<UserOutlined />}
          style={{ position: "absolute", right: 100 }}
        >
         <Link to="/login">Login</Link>
        </Item>
        )}

        {!user && ( <Item
          key="register"
          icon={<UserAddOutlined />}
          style={{ position: "absolute", right: 0 }}
        >
          <Link to="/register">Register</Link>
        </Item>)}
        <Item>
        <SearchProductMui />
          </Item>
        
       
      </Menu>
    );

}

export default Header;