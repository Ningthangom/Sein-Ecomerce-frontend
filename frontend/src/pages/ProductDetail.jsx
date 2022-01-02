import React, {useEffect, useState} from 'react';
import {getAproudct,productRating, relatedProducts} from '../connectBackend/product';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProductDetailCard from '../components/Cards/SingleProduct/ProductDetailCard'
import ProductCard from '../components/Cards/ProductCard'

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState({});
    const [rating, setRating] = useState(0);
    const [relatedproducts, setRelatedProducts] = useState([])

    const {slug} = useParams();
    const {user} = useSelector((state) => ({ ...state }));
    const productId = productDetail._id;

    useEffect(() => {
        getProductDetail()
      
    },[slug])

    useEffect(() => {
      if (productDetail.ratings && user) {
        let existingRatingObject = productDetail.ratings.find(
          (ele) => ele.postedBy.toString() === user._id.toString()
        );
        existingRatingObject && setRating(existingRatingObject.star); // current user's star
      }
    });

    const getProductDetail = () => {
        getAproudct(slug).then((res) =>{ 
            setProductDetail(res.data)
            relatedProducts(res.data._id)
            .then((res) => {
              setRelatedProducts(res.data);
            })
            console.log(res.data)
        });
     

    }

    
    const onStarClick = (newRating, name) => {
        setRating(newRating);
        console.log("new rating", rating);
        productRating (name, newRating, user.token)
        .then((res) => {
          console.log("rating Click: ", res.data);
          getProductDetail();
        })
        .catch((err) => {
          console.log("error in posting rating", err)
        })
    }

    return (
      <div className="container-fluid">
        <div className="row pt-4">
          <ProductDetailCard
           product={productDetail}
           onStarClick={onStarClick}
           star={rating}
            />
        </div>
        <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
        <div className="row pb-5">
        {relatedproducts.length ? (
          relatedproducts.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
      </div>
    );
}

export default ProductDetail;