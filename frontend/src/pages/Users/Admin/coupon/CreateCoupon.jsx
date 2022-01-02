import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../../connectBackend/coupon"
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../nav/nav";

// media quries
import json2mq from "json2mq";
import useMediaQuery from "@mui/material/useMediaQuery";

const CreateCouponPage = () => {

    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");
    const [coupons, setCoupons] = useState([]);

    // media quries
  const matches = useMediaQuery(
    json2mq({
      minWidth: 500,
    })
  );


      // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        loadAllCoupons();
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => toast.error("create coupon err", err));
  };


  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <div className="container-fluid">
      <div className="row">
        {matches ? (
          <div className="col-md-2">
            <AdminNav />
          </div>
        ) : null}

        <div className="col-md-10">
          <h4>Coupon</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <Table>
            <Thead style={{ backgroundColor:'red'}}>
              <Tr>
                <Th scope="col">Name</Th>
                <Th>Expiry</Th>
                <Th>Discount</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
                {coupons.map((c) => (
                     <Tr key={c._id}>
                       <Td>{c.name}</Td>
                       <Td>{new Date(c.expiry).toLocaleDateString()}</Td>
                       <Td>{c.discount}%</Td>
                       <Td>
                         <DeleteOutlined
                           onClick={() => handleRemove(c._id)}
                           className="text-danger pointer"
                         />
                       </Td>
                     </Tr>
                    
                ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
