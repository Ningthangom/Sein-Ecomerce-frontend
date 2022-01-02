import React, { useState, useEffect } from "react";
/* import UserNav from "../../components/nav/UserNav"; */
import { getWishlist, removeWishlist } from "../../../connectBackend/user"
import { useSelector} from "react-redux";

/* import ProductCard from '../../../components/Cards/ProductCard' */
import WishCard from '../../../components/Cards/WhishCard';
import './wishstyle.css'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      console.log(res.data); 
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
       {/*    <UserNav /> */}
        </div>
            <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Wish List </h4>
          )}

          {wishlist.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {wishlist &&
              wishlist.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <WishCard product={p}  handleRemoveFromWish = {handleRemove}/>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
