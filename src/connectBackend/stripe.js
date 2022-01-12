import axios from "axios";

export const createPaymentIntent = (authtoken, couponRedux) =>{
  console.log("createPayment intend is called")
 return axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {couponApplied:couponRedux },
    {
      headers: {
        authtoken,
      },
    }
  ).catch((err) => {
      console.log("error in calling to backed")
  })};
