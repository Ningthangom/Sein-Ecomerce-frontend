import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import general from '../../images/general.jpg'
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import {toast} from "react-toastify";
import {DeleteOutlined } from "@ant-design/icons"

const CartTableBody = ({p}) => {

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

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
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

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };


    return (
        <Tbody>
     
          <Tr>
            <Td>
              <div style={{ width: "100px", height: "auto" }}>
                {p.images.length ? (
                  <ModalImage
                    small={p.images[0].url}
                    large={p.images[0].url}
                  />
                ) : (
                  <ModalImage small={general} large={general} />
                )}
              </div>
            </Td>
            <Td>{p.title.substring(0, 10)}</Td>
            <Td>$ {p.price}</Td>
            <Td>{p.brand.substring(0, 10)}</Td>
          {/*   <Td>
              <select
                onChange={handleColorChange}
                name="color"
                className="form-control"
                style={{ width: 95 }}
              >
                {p.color ? (
                  <option value={p.color}>{p.color}</option>
                ) : (
                  <option>Select</option>
                )}
                {colors
                  .filter((c) => c !== p.color)
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </Td> */}
            <Td className="text-center">
              <select
               onChange={handleQuantityChange}
                name="color"
                className="form-control"
                style={{ width: 95, marginRight:4 }}
              >
                 {p.count ? (
                  <option value={p.count}>{p.count}</option>
                ) : (
                  <option>Select</option>
                )}
                {number
                  .filter((c) => c !== p.count)
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </Td>
            <Td >{p.shipping}</Td>
            <Td 
            className="text-danger"
            onClick={handleRemove}
            style = {{ cursor: 'pointer'}}

            ><DeleteOutlined /></Td>
          </Tr>
        
      </Tbody>
    )
}


export default CartTableBody;