import React, {useState, useEffect} from 'react';
import {Card,Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined,HeartOutlined } from "@ant-design/icons";
import grocery from '../../images/general.jpg';

import {useNavigate, Link} from 'react-router-dom';
import {AverageRating} from './SingleProduct/rating';
import StarRating from 'react-star-ratings';
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {removeWishlist, addToWishlist, getWishlist} from '../../connectBackend/user';
import {toast} from 'react-toastify'
const {Meta} = Card;


const WishCard = ({product, handleRemoveFromWish}) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const [outOfStock, setOutOfStock] = useState("out of Stock")

    const dispatch = useDispatch();
    const handleAddToCart = () => {
        if(product.quantity < 1) {
          return;
        }
    
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
          // if cart is in local storage GET it
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          // push new product to cart
          cart.push({
            ...product,
            count: 1,
          });
          // remove duplicates
          let unique = _.uniqWith(cart, _.isEqual);
          // save to local storage
          // console.log('unique', unique)
          localStorage.setItem("cart", JSON.stringify(unique));
    
           // show tooltip
           setTooltip("Added");
    
           // add to redux state
           dispatch({
             type: "ADD_TO_CART",
             payload: unique,
           });
            // show cart items in side drawer
          dispatch({
            type: "SET_VISIBLE",
            payload: true,
          });
        }
      };
    
        const {images, title, description, slug, price, quantity} = product;

    return (
        <>
      
        <Card
       
        cover={
          <img
            src={images && images.length ? images[0].url: grocery}
            alt='grocery'
            style={{ height: "150px", objectFit: "cover", marginTop: 5 }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={quantity < 1 ? outOfStock : tooltip}> 
            <a onClick={handleAddToCart} disabled={quantity < 1}>
          <ShoppingCartOutlined className="text-danger" /> 
          <br /> 
           {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
        </a>
       
        
        </Tooltip>, 
      <Tooltip title={"remove from wishlist"}>
        <a onClick={() => handleRemoveFromWish(product._id)}>
               <HeartOutlined className="text-danger" />
               <br />
                Remove 
             </a> 
        </Tooltip>
      
          
        ]}
      >
        <Meta
     /*    style={{marginTop: 5}} */
          title={title }
          description={`${description && description.substring(0, 40)}...`}
         
        />
          <Meta
          className="text-danger"
          title={`$ ${price}`}
         
        />
         {product && product.ratings && product.ratings.length > 0 ? AverageRating(product)
            : <StarRating starRatedColor='grey' starDimension="25px" starSpacing=""/> }
      </Card>
      </>
    )
}


export default WishCard;