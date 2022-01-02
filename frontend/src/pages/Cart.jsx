import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ProductCardInCheckout from "../components/Cards/ProductCardInCheckout";
import CartTableBody from '../components/Cards/CartTableBody'
import CartTable from "../components/Cards/CartTable";
import {userCart} from '../connectBackend/user'
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  console.log(cart);
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  useEffect(() => {
    dispatch({
      type: "COD",
      payload: false,
    });
    dispatch({
      type: "PNP",
      payload: false,
    });
  },[])

  const saveOrderToDb = () => {
    // 
    userCart(cart, user.token)
    .then((res) => {
      console.log("CART POST RES", res);
      if(res.data.ok){
       navigate('/user/checkout')}
    })
    .catch((err) =>{
      if(err.status === 401) {
        toast.error("please logout and login again")
      }
      toast.error(err.message)
    })
  };


  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/user/checkout");
      })
    .catch((err) => {
      if(err.status === '401') {
        toast.error("please logout and login again")
      }
      console.log("cart save err", err)
    }
    );
  };
  const savePickupOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "PNP",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/user/checkout");
      })
    .catch((err) => {
      if(err.status === '401') {
        toast.error("please logout and login again")
      }
      console.log("cart save err", err)
    }
    );
  };
  const showCartItems = () => (
    <Table>
    <Thead>
      <Tr>
        <Th>Image</Th>
        <Th>Title</Th>
        <Th>Price</Th>
        <Th>Brand</Th>
       {/*  <Th>Color</Th> */}
        <Th>Count</Th>
        <Th >Shipping</Th>
        <Th >Remove</Th>
      </Tr>
    </Thead>

      {cart.map((p) => (
        <CartTableBody key={p._id} p={p} />
      ))}
    </Table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {cart.length ? (
          /*   <CartTable p={cart} /> */
            showCartItems()
          ) : (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
            pay now and delivery
            </button>
            <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
              <br />
              <button
                onClick={savePickupOrderToDb}
                className="btn btn-sm btn-secondary mt-2"
                disabled={!cart.length}
              >
                Pickup and pay
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                /*  to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }} */
                to={"/login"}
                state={"cart"}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
