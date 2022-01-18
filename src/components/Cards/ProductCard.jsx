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




const ProductCard = ({product}) => {
 /*  console.log("product in ProductCard: ", product); */

  const [tooltip, setTooltip] = useState("Click to add");
  const [outOfStock, setOutOfStock] = useState("out of Stock")
  const [wished, setWished] = useState();

  const user = useSelector((state) => state.user);
/*   console.log("from wish list", fromWishList) */
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

/*   useEffect(()=> {
    const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      let WistList = res.data.wishlist;
      console.log("WishList", WistList);
      console.log("products: ", product)
      let existinWish = WistList.filter(item => item._id !== product._id);
  
      if(existinWish){
        console.log("does not exist")
        setWished(false)
      }else{
        console.log("exist")
        setWished(true)
      }
    
    });
    if(user) loadWishlist();
  },[user]) */


  // add to cart function 
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

    const {images, title, description, slug, price, quantity, measurement} = product;

    const handleRemoveFromWish = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      setWished(false);
     /*  navigate('/user/wishlist') */
     
    });

    const handleAddToWishlist = (productId) => {
    /*   e.preventDefault(); */
      addToWishlist(productId, user.token).then((res) => {
        console.log("ADDED TO WISHLIST", res.data);
        toast.success("Added to wishlist");
        setWished(true);
      /*   history.push("/user/wishlist"); */
      });
    };

    return ( 

      <>
      <Card
       style={{ marginBottom: '2rem'}}
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
     /*   wished === true ? <Tooltip title={"remove from wishlist"}>
       <a onClick={() => handleRemoveFromWish(product._id)}>
              <HeartOutlined className="text-danger" />
              <br />
               Remove 
            </a> 
       </Tooltip> : 
       <Tooltip title={"add to wishlist"}>
       <a onClick={() => handleAddToWishlist(product._id)}>
              <HeartOutlined className="text-info" />
              <br/>
               Add to wishlist
            </a> 
       </Tooltip>
         */
       ]}
     >
       <Meta
    /*    style={{marginTop: 5}} */
         title={title }
         description={`${description && description.substring(0, 40)}...`}
        
       />
         <Meta
         className="text-danger"
         title={`$ ${price}  ${measurement && measurement !== "other" ? ` per  ${measurement} `: ``}`}
        
       />
        {product && product.ratings && product.ratings.length > 0 ? AverageRating(product)
           : <StarRating starRatedColor='grey' starDimension="25px" starSpacing=""/> }
     </Card>
      
      
      </>
    )

}

export default ProductCard;