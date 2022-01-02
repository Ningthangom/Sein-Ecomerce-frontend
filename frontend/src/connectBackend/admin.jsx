import axios from "axios"
/* import { auth } from "../../../backend/firebase"; */

export const getOrders = async (authtoken) => {
  console.log("getorder in connectbackend is called")
   return  await axios.get(`${process.env.REACT_APP_API}/admin/orders`,{
        headers: { 
            authtoken,
        }
    })
}


export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const salesReport = async (date, authtoken) =>{
    const {startDate, endDate} = date;
/*     console.log("salesReport is called")
    console.log("start date: ", startDate)
    console.log("these are dates: ", date)
    console.log("this is token: ", authtoken) */
 return await axios.put(
    `${process.env.REACT_APP_API}/admin/weeklysales`,
    {date},
    {
      headers: {
        authtoken,
      },
    }
  )};