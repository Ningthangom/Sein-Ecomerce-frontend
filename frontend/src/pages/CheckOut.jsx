import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  createPickupOrder,
} from "../connectBackend/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Address from "../components/Forms/Address";
import {SocketContext} from "../connectBackend/socketConnect"

const initialAddressState = {
  address: "",
  city: "",
  postalCode: "",
  country: "",
  phoneNo: "",
};



const Checkout = () => {


  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  /*  const [address, setAddress] = useState(""); */
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();
    // socket io 
    const socket = useContext(SocketContext);
    const activateSocket =  (neworder) => {
      console.log("this is new order to send to socket as payload",neworder )
      socket.emit("newOrderAlert",neworder)
    }

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  // shipping address
  const [addressValues, setAddressValues] = useState(initialAddressState);

  const dispatch = useDispatch();
  const { user, couponRedux, COD, PNP } = useSelector((state) => ({
    ...state,
  }));
  const { shippingInfo } = user;
  /* console.log(shippingInfo); */

  useEffect(() => {
    getUserCart(user.token).then((res) => {
    /*   console.log("user cart res", JSON.stringify(res.data, null, 4)); */
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  useEffect(() => {
    if (shippingInfo) {
      setAddressValues({
        ...addressValues,
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
        phoneNo: shippingInfo.phoneNo,
      });
    }
  }, []);

/*   console.log({ ...addressValues }); */

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    //
    saveUserAddress(addressValues, user.token)
      .then((res) => {
       /*  console.log(res.data); */
        toast.success(`detailed posted successfully`);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            shippingInfo: res.data.shippingInfo,
          },
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("please logout and log in again");
        }
        toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setAddressValues({
      ...addressValues,
      [e.target.name]: e.target.value,
    });
    console.log(`${e.target.name}: ${e.target.value}`);
  };

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  // coupon
  const applyDiscountCoupon = () => {
    if (couponRedux === true) {
      toast.error("you have already applied coupon");
    } else {
      console.log("send coupon to backend", coupon);
      applyCoupon(user.token, coupon).then((res) => {
        console.log("RES ON COUPON APPLIED", res.data);
        if (res.data) {
          setTotalAfterDiscount(res.data);
          // update redux coupon applied
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        }
        // error
        if (res.data.err) {
          setDiscountError(res.data.err);
          console.log("err: ", res.data.err);
          // update redux coupon applied
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
        }
      });
    }
  };

  const showApplyCoupon = () => (
    <div className="m-4">
      <input
        onChange={(e) => setCoupon(e.target.value)}
        value={coupon}
        type="text"
        className="form-control "
        required
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </div>
  );

  const handlePlaceOrder = () => {
    navigate("/user/payment");
  };

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponRedux).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
      if(res.data.newOrder){
        /* setSocketOrder(order.data.justCreatedOrder); */
        activateSocket(res.data.newOrder);
      }
    });
  };

  const createPickupOrderInCheckout = () => {
    createPickupOrder(user.token, PNP, couponRedux).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "PNP",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
      if(res.data.newOrder){
        /* setSocketOrder(order.data.justCreatedOrder); */
        activateSocket(res.data.newOrder);
      }
    }).catch(err => {
      toast.error("error in placing order")
    });
  };

  var checkoutbutton;

  if (COD) {
  
    checkoutbutton = <button
        className="btn btn-primary"
        disabled={!addressValues || !products.length}
        onClick={createCashOrder}
      >
        Place Cash on delivery Order
      </button>;
  
  } else if (PNP) {
    checkoutbutton =
      <button
        className="btn btn-primary"
        disabled={!products.length}
        onClick={createPickupOrderInCheckout}
      >
        Place Pickup order
      </button>;
  } else {
    checkoutbutton =
      <button
        className="btn btn-primary"
        disabled={!shippingInfo || !products.length}
        onClick={handlePlaceOrder}
      >
        Place pay now and deliver order
      </button>;
  
  }

  return (
    <div className="row">
      <div className="col-md-6">
        {PNP === true ? null : (
          <h4 className="ml-4">Delivery Address</h4>
        )}
       <Address
            handleSubmit={handleAddressSubmit}
            handleChange={handleChange}
            setValues={setAddressValues}
            values={addressValues}
            PNP = {PNP}
          />

        <br />
        <br />
        <h4 className="ml-4">Got Coupon?</h4>
        {discountError && <p className="bg-danger p-2 m-4">{discountError}</p>}
        {showApplyCoupon()}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: {total}</p>
        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {/*  {COD ? ( <button
                className="btn btn-primary"
                disabled={!addressValues || !products.length}
                onClick={createCashOrder}
              >
                Place Cash Order
              </button>) : (
               <button
              className="btn btn-primary"
              disabled={!shippingInfo || !products.length}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>) } */}
            {checkoutbutton}
          </div>

          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!products.length}
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Checkout;
