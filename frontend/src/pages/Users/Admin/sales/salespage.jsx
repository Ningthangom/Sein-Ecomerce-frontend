import React, { useState, useEffect,} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Card from "@mui/material/Card";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

// import images 
import delivery from './images/deliverorder.png'
import payondelivery from './images/payondelivery.png'
import pickuporder from './images/pickuporder.png'
import sales from './images/sales.png'
import totalorderImage from './images/totalorder.png'


import { salesReport } from "../../../../connectBackend/admin";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../nav/nav";

// media quries
import json2mq from "json2mq";
import useMediaQuery from "@mui/material/useMediaQuery";

const SalesPage = () => {

  const [startDate, setStartDate] = useState(new Date(new Date() - 7 * 60 * 60 * 24 * 1000));
  const [endDate, setEndDate] = useState(new Date());
  const [totalSales, setTotalSales] = useState(0);
  const [dailySales, setDailySales] = useState([]);
  const [pickupOrder, setPickupOrder] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const [COD, setCOD] = useState([]);
  const [PND, setPND] = useState([]);

  const [totalOrders, setTotalOrders] = useState(0);
  

  const navigate = useNavigate();

  // media quries
  const matches = useMediaQuery(
    json2mq({
      minWidth: 500,
    })
  );

    useEffect(() => {
        loadSales()
    },[]);

  const loadSales = () => {
    let Sdate = startDate.toISOString();
    let Edate = endDate.toISOString();
      salesReport({ Sdate, Edate }, user.token)
      .then((res) => {
        let {sortedArray,weeklySalesum, filteredOrder } = res.data;
        setTotalSales(weeklySalesum)
        setDailySales(sortedArray)
        setTotalOrders(filteredOrder.length)
        saleType(filteredOrder);
      }).catch((err)=>{
          toast.error("error in getting sales")
      }
     )
    }

    // calculate deliver order vs pickup order 
    const saleType = (filteredOrder) => {
        toast.success("saleType is called");
        const pickuporder = filteredOrder.filter((p) => p.orderType === 'pickup order');
       /*  console.log("these are pickup orders: ", pickuporder); */
        setPickupOrder(pickuporder);
        const cashOndelivery = filteredOrder.filter((p) => p.orderType === 'Cash On Delivery');
              setCOD(cashOndelivery)
        const payanddeliver = filteredOrder.filter((p) => p.orderType === 'pay and deliver');
            setPND(payanddeliver)
    }   

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    let Sdate = startDate.toISOString();
    let Edate = endDate.toISOString();
    salesReport({ Sdate, Edate }, user.token)
      .then((res) => {
       /*  console.log("this is res", res.data) */
        let {sortedArray,weeklySalesum, filteredOrder } = res.data;
        setTotalSales(weeklySalesum)
        setDailySales(sortedArray);
        setTotalOrders(filteredOrder.length)
        saleType(filteredOrder);
        toast.success(`"Sale" is created`);
      })
      .catch((err) => toast.error("create coupon err", err));
  };

 /*  console.log("startDate: ", startDate, "endDate: ", endDate);
  console.log("pickup orders ", pickupOrder) */
  return (
    <div className="container-fluid">
      <div className="row">
        {matches ? (
          <div className="col-md-2">
            <AdminNav />
          </div>
        ) : null}

        <div className="col-md-10">
          <h4>Sales</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">from</label>
              <br />
              <DatePicker
                className="form-control"
                selected={startDate}
                value={startDate}
                onChange={(date) => {
                  /*  console.log("startDate: ", date) */
                  setStartDate(date);
                }}
                dateFormat="d MMMM y"
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted"> end </label>
              <br />
              <DatePicker
                className="form-control"
                selected={endDate}
                value={endDate}
                onChange={(date) => {
                  console.log("endDate: ", date);
                  setEndDate(date);
                }}
                dateFormat="d MMMM y"
                required
              />
            </div>

            <button className="btn btn-outline-primary">Search</button>
          </form>

          <br />

          <div className="container">
            <div className="row">
            <Card
              sx={{ maxWidth: 345, marginBottom: 4, marginRight: 4, backgroundColor: "orange" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sales}
                  alt="green iguana"
                />
                <Typography variant="body2" color="text.secondary">
                  {" "}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total sales: $ {(totalSales/100).toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              sx={{ maxWidth: 345, marginBottom: 4,marginRight: 4, backgroundColor: "red" }}
            >
              <CardActionArea onClick={() => navigate('/admin/pickuporders', {state: pickupOrder})}>
                <CardMedia
                  component="img"
                  height="140"
                  image={pickuporder}
                  alt="green iguana"
                />
                <Typography variant="body2" color="text.secondary">
                  {" "}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Pickup Orders:  {pickupOrder.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              sx={{ maxWidth: 345, marginBottom: 4,marginRight: 4, backgroundColor: "green" }}
            >
              <CardActionArea onClick={() => navigate('/admin/pickuporders', {state: PND})}>
                <CardMedia
                  component="img"
                  height="140"
                  image={delivery}
                  alt="green iguana"
                />
                <Typography variant="body2" color="text.secondary">
                  {" "}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    paid online and delivered :  {PND.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              sx={{ maxWidth: 345, marginBottom: 4,marginRight: 4, backgroundColor: "blue" }}
            >
              <CardActionArea onClick={() => navigate('/admin/pickuporders', {state: COD})}>
                <CardMedia
                  component="img"
                  height="140"
                  image={payondelivery}
                  alt="green iguana"
                />
                <Typography variant="body2" color="text.secondary">
                  {" "}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   cash on delivery:  {COD.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              sx={{ maxWidth: 345, marginBottom: 4,marginRight: 4, backgroundColor: "blue" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={totalorderImage}
                  alt="green iguana"
                />
                <Typography variant="body2" color="text.secondary">
                  {" "}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   total orders:  {totalOrders}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </div>
           
            {dailySales ? (
                <Table>
                <Thead style={{ backgroundColor: "red" }}>
                <Tr>
                {/* //  <Th scope="col">Name</Th> */}
                    <Th scope="col">date</Th>
                    <Th>Total sales</Th>
                    {/* <Th>Action</Th> */}
                </Tr>
                </Thead>
                <Tbody>
                {dailySales.map((c) => (
                    <Tr key={c._id.day}>
                    <Td>{c._id.day}/{c._id.month}/{c._id.year}</Td>
                    <Td> $ {(c.totalSales/100).toFixed(2)}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            ) : <p>No order was found</p> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
