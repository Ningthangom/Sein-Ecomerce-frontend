import React, {useState} from 'react';
import {Card, Tabs, Tooltip} from 'antd';
import { Carousel } from "react-responsive-carousel";
import generalImage from '../../../images/general.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import StarRating from "react-star-ratings";
import ProductListItems from './ProductListItems'
import { useSelector, useDispatch } from "react-redux";
import {addToWishlist} from '../../../connectBackend/user'
import {toast} from 'react-toastify'

import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';

import RatingModal from '../../Modals/RatingModal';
import {AverageRating} from './rating';
import _ from "lodash";

const { TabPane } = Tabs;


const ProductDetailCard = ({ product, onStarClick, star }) => {
  const { title, description, images, slug, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const {user} = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch();

  const handleAddToCart = () => {
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

      // add to reeux state
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


  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
    /*   history.push("/user/wishlist"); */
    });
  };


  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
          </Carousel>
        ) : (
          <Card
            cover={
              <img src={generalImage} className="mb-3 card-image" alt="" />
            }
          ></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
      <h5 className="bg-info p-3">{title}</h5>
      {product && product.ratings && product.ratings.length > 0 ? AverageRating(product)
      : <StarRating starRatedColor='grey' starDimension="25px" starSpacing=""/> }

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,
            <RatingModal>
               <StarRating
            name={_id}
            numberOfStars={5}
            // default rating
            rating={star}
            changeRating={onStarClick}
            isSelectable={true}
            starRatedColor="gold" />
            </RatingModal>
            
          ]}
        >
          {/* <Meta title={title} description={description} /> */}
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};


export default ProductDetailCard;