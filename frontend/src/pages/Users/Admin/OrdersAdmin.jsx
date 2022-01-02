
import React, {useState, useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

import {getOrders, changeStatus} from '../../../connectBackend/admin';
import {toast} from 'react-toastify';
import AdminNav from "./nav/nav"; 
import Orders from '../../../components/order/Order';
import SocketOrders from '../../../components/order/SocketOrders'

//socket
import { SocketContext } from "../../../connectBackend/socketConnect";


const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
      // socket
  const socket = useContext(SocketContext);
  console.log("socket is on inside order", socket)
  const [socketObject, setSocketObject] = useState([]);
   
    const {user} = useSelector((state) => ({...state}))

    useEffect(() =>{
        loadOrders()
        socket.on("newOrderAlert", (payload) => {
          setSocketObject(socketObject => [ payload,...socketObject])
         });
    },[])


    const loadOrders = () => 
      getOrders(user.token).then((res) => {
         /*  console.log("these are orders: ", res.data) */
          setOrders(res.data)
          
      }).catch((err) => {
         /*  console.log("error in getting orders for admin: ", err) */
         toast.error("error in getting order")
      });

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
          toast.success("Status updated")
          loadOrders();
        });
      };
  /*   console.log(JSON.stringify(socketObject, null, 4));
    console.log(JSON.stringify(orders, null, 4)); */
    return (
        <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">       
        </div>

        <div className="col-md-6">
          <h4>Admin Dashboard</h4>
          <p>If you get notification and do not have new order or "not processed" order, please refresh the page </p>
   
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
    )
}

export default OrdersAdmin;