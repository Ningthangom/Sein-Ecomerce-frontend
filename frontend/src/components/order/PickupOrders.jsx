import React, {useState} from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../Cards/ShowpaymentInfo";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {useLocation} from 'react-router-dom'

const PickupOrders = () => {

  // step one
  const [searchId, setSearchId] = useState("")
  const {state} = useLocation();
  const [orders, setOrders] = useState(state)

  // step two create input in return
  // step three create onChange function
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchId((e.target.value).replace(/ /g,''))
  }

  // step four will be used in map
  const searchfilter = (searchId) => (c)=> c._id.includes(searchId);
  //step five add to map


 

    const showOrderInTable = (order) =>{
        
        return( 
        <Table>
            <Thead>
              <Tr>
               {/*  <Th>Image</Th> */}
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>Brand</Th>
                <Th>Color</Th>
                <Th>Count</Th>
                <Th >Shipping</Th>
              </Tr>
            </Thead>
            <Tbody>
            {order.products.map((p,i) => (
                 <Tr key={i}>
                 <Td>{p.product.title}</Td>
                 <Td>${p.product.price}</Td>
                 <Td>{p.product.brand}</Td>
                 <Td>{p.product.color}</Td>
                 <Td>{p.count}</Td>
                 <Td> 
                     {p.product.shipping === "Yes" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                  </Td>
               </Tr>
              
            ))}
             
          </Tbody>
        </Table>)};


        const getBackgroundColor = (orderStatus) => {
          let color;
          if (orderStatus === "Processing") {
              color = 'orange';
          } else if (orderStatus === "Dispatched") {
              color = 'grey';
          } else if (orderStatus === "Cancelled") {
              color = 'blue';
          } else if (orderStatus === "Not Processed") {
              color = 'red';
          } else if (orderStatus === "Completed") {
              color = 'green';
          }
          return color;
      };
        
     //.filter(searchfilter(searchId))
      console.log(state  )
    return (
      <>
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="col">
                <input
          type="search"
          placeholder="order id"
          value={searchId}
          onChange={handleSearch} 
          className="form-control mb-4 mt-4"
        />
       
        {orders.filter(searchfilter(searchId)).map((order) => (
          <div key={order._id} className="row pb-5 mb-2">
            <div
              className=" btn-block p-3"
              style={{ backgroundColor: getBackgroundColor(order.orderStatus),borderRadius: '2%' }}
            >
              <p>orderId: {order._id}</p>
              <ShowPaymentInfo order={order} showStatus={false} />
            </div>
            {showOrderInTable(order)}
            { order && order.orderType === "pay and deliver" || order.orderType === "Cash On Delivery" ? 
             <ul style={{ marginTop: 15, marginBottom: 0}}>
             <li>Delivery address: {order.orderdBy.shippingInfo.address},
                {order.orderdBy.shippingInfo.city},
                 {order.orderdBy.shippingInfo.postalCode},
                {order.orderdBy.shippingInfo.country} || </li>
                
           </ul> 
              : null}
              <ul>
                <li>customer number: {order.orderdBy.shippingInfo.phoneNo}</li>
                <li>Ordered By: {order.orderdBy.name}</li>
              </ul>
          </div>
        ))}
      </div>
                </div>
            </div>
        </div>
    
        
      </>
    );
}
export default PickupOrders;