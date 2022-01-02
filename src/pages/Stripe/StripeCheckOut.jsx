import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements, PaymentElement,  CardNumberElement, CardExpiryElement, CardCvcElement  } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd";
import generalImage from '../../images/general.jpg';
import {Link} from 'react-router-dom'
import { DollarOutlined, CheckOutlined, SwapOutlined } from "@ant-design/icons";
import { createPaymentIntent } from "../../connectBackend/stripe";
import { createOrder, emptyUserCart  } from "../../connectBackend/user";
import { toast } from "react-toastify";

// socket
import {SocketContext} from '../../connectBackend/socketConnect';


const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, couponRedux } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // total payables 
  const [cartTotal, setCartTotal] = useState(0);
  const [showTotalAfterDiscount, setShowTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);


  // socket io 
  const socket = useContext(SocketContext);
  
  const [socketOrder, setSocketOrder ] = useState([]);


  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, couponRedux).then((res) => {
      /* console.log("create payment intent", res.data); */
      setClientSecret(res.data.clientSecret);
      setPayable(res.data.payable);
      setCartTotal(res.data.cartTotal);
      setShowTotalAfterDiscount(res.data.cartTotal - res.data.totalAfterDiscount)
    });
    
  }, []);

/*   useEffect(() => {
    console.log("new order for socket: ", socketOrder)
    socket.emit("newOrderAlert", {socketOrder})
  
  },[socketOrder]) */


  const activateSocket =  (neworder) => {
    console.log("this is new order to send to socket as payload",neworder )
    socket.emit("newOrderAlert",neworder)
  }




 /*  useEffect(() => {
    applyCoupon(user.token, coupon).then((res) => {
        setTotalAfterDiscount(res.data)
    }).catch((error) => console.log("error gettign discountedtotal : ", error))
  }, []) */

  const handleSubmit = async (e) => {
    //
    e.preventDefault();
    setProcessing(true);
    console.log("handle submit is called")
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      console.log(payload.error.message);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token)
      .then((order) => {
          if(order.data.ok) {
              // empty cart from local storage
            if (typeof window !== "undefined") localStorage.removeItem("cart");
            // empty cart from redux
            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });
            // update redux coupon applied
            dispatch({
              type: "COUPON_APPLIED",
              payload: false,
            });
              // emty cart from database
              emptyUserCart(user.token);
          }
          console.log("this is new order",order.data.justCreatedOrder)
        if(order.data.justCreatedOrder){
          /* setSocketOrder(order.data.justCreatedOrder); */
          activateSocket(order.data.justCreatedOrder);
        }
        
         
      
      }).catch((err) =>{ 
        toast.error("something went wrong")
        console.log("error in ordering", err)})
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);

       
    }
  };

  const handleChange = async (e) => {
     // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };


  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
       /*  lineHeight: "1",
        lineWidth: "2", */
       marginLeft: "50px",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {couponRedux && showTotalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total discount: $${showTotalAfterDiscount.toFixed(2)}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={generalImage}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          className="stripe-input"
          options={cartStyle}
          onChange={handleChange}
        />
        <br/>
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
