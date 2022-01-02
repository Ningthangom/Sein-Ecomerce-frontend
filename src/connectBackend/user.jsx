import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

  export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

  export const saveUserAddress = async ( address, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );


  export const applyCoupon = async (authtoken, coupon) =>{
    console.log(`apply coupon is called inside user connectbackend`)

 return await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  )};


  

  // orders
  export const createOrder = async (stripeResponse, authtoken) =>{
    console.log(`createOrder is called inside user connectbackend`)
 return await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  )};

  export const createCashOrderForUser = async (authtoken, COD, couponTrueOrFalse) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    {couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const createPickupOrder = async (authtoken, PNP, couponTrueOrFalse) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/pickup-order`,
    {couponApplied: couponTrueOrFalse, PNP },
    {
      headers: {
        authtoken,
      },
    }
  );



  export const getOrderList = async (authtoken) =>{
    console.log(`getOrderList is called inside user connectbackend`)
 return await axios.get(
    `${process.env.REACT_APP_API}/user/orders`,
    {
      headers: {
        authtoken,
      },
    }
  )};


  // wishList 
  export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );





