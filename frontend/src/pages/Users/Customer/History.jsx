import React, { useState, useEffect } from "react";
/* import UserNav from "../../components/nav/UserNav"; */
import { getOrderList } from "../../../connectBackend/user";
import { useSelector, useDispatch } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../../components/Cards/ShowpaymentInfo";
import { toast } from "react-toastify";
import Invoice from '../../../components/order/Invoice'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    PDFViewer,
  } from "@react-pdf/renderer";

const History = () => {

  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
  getOrderList(user.token).then((res) => {
    console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

    const showOrderInTable = (order) =>( 
    <Table>
        <Thead>
          <Tr>
           {/*  <Th>Image</Th> */}
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>Brand</Th>
            <Th>Count</Th>
            <Th >Shipping</Th>
            <Th >Order Type</Th>
          </Tr>
        </Thead>
        <Tbody>
        {order.products.map((p,i) => (
             <Tr key={i}>
             <Td>{p.product.title}</Td>
             <Td>${p.product.price}</Td>
             <Td>{p.product.brand}</Td>
             <Td>{p.count}</Td>
             <Td> 
                 {p.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
              
              </Td>
              <Td>{order.orderType}</Td>
           </Tr>
        ))}
      </Tbody>
    </Table>);
   
   const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={
        <Invoice order = { order} />
      }
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      <p className="text-danger">please refresh the page before downloading pdf</p>
      Download PDF
    </PDFDownloadLink>
  );



    const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            {showDownloadLink(order)}
          </div>
        </div>
      </div>
    ));


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
         {/*  <UserNav /> */}
        </div>
        <div className="col-md-6 text-center">
            <h4> {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
            </h4>
            {showEachOrders()}
            </div>
      </div>
    </div>
  );
};

export default History;