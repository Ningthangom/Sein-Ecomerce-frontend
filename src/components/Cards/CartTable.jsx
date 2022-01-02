import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import general from '../../images/general.jpg'
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import {toast} from "react-toastify";
import {DeleteOutlined } from "@ant-design/icons"

const  CartTable = ({p}) => {

  const cartItems ={p};
  console.log("this is cartItem passed from cart", cartItems);


 const colors = [ "Yellow",
  "Red",
  "Brown",
  "Silver",
  "White",
  "Blue",
  "Black",
  "others"
]

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

let dispatch = useDispatch();

const handleColorChange = selectedItem =>(e) => {
 /*  console.log("color changed", e.target.value);
  console.log("selectedItem: ", selectedItem); */

  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const newCart = cart.map((product, i) => {
      // update the color of product which has the same id as selectedItem
      if (selectedItem === product._id) {
        return {
          ...product,
          color: e.target.value
        }
      }
      return product;
    });

    /* localStorage.setItem("cart", JSON.stringify(newCart)); */
      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(newCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
  }
};


const handleQuantityChange = (productCount, productId) => (e) => {
  // console.log("available quantity", p.quantity);
  let count = e.target.value
   /* ? 1 : e.target.value; */
   if(count < 1 ) {
     toast.error ("quantity must be greater than one")
     count = 1;
   }

  /* if (count > productCount) {
    toast.error(`Max available quantity: ${productCount}`);
    return;
  } */

  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  }
};
/* 
const handleRemove = (productId) =>  {
  // console.log(p._id, "to remove");
  console.log("handle remove is called");
 
  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // [1,2,3,4,5]

 
  const newCart = cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    }); 
  

    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  }
};
  */


    
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Title</Th>
          <Th>Price</Th>
          <Th>Brand</Th>
          <Th>Color</Th>
          <Th>Count</Th>
          <Th >Shipping</Th>
          <Th >Remove</Th>
        </Tr>
      </Thead>
      <Tbody>
        {cartItems.p.map((product) => (
          <Tr>
            <Td>
              <div style={{ width: "100px", height: "auto" }}>
                {product.images.length ? (
                  <ModalImage
                    small={product.images[0].url}
                    large={product.images[0].url}
                  />
                ) : (
                  <ModalImage small={general} large={general} />
                )}
              </div>
            </Td>
            <Td>{product.title.substring(0, 10)}</Td>
            <Td>$ {product.price}</Td>
            <Td>{product.brand.substring(0, 10)}</Td>
            <Td>
              <select
                onChange={handleColorChange(product._id)}
                name="color"
                className="form-control"
                style={{ width: 95 }}
              >
                {product.color ? (
                  <option value={product.color}>{product.color}</option>
                ) : (
                  <option>Select</option>
                )}
                {colors
                  .filter((c) => c !== product.color)
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </Td>
            <Td className="text-center">
              <select
               onChange={handleQuantityChange(product.count, product._id)}
                name="color"
                className="form-control"
                style={{ width: 95, marginRight:4 }}
              >
                 {product.count ? (
                  <option value={product.count}>{product.count}</option>
                ) : (
                  <option>Select</option>
                )}
                {number
                  .filter((c) => c !== product.count)
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </Td>
            <Td >{product.shipping}</Td>
            <Td 
            className="text-danger"
          /*   onClick={handleRemove(product._id)} */
            style = {{ cursor: 'pointer'}}

            ><DeleteOutlined /></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}


export default CartTable;