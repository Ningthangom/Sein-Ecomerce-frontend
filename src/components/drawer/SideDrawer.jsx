import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import general from '../../images/general.jpg'

const SideDrawer = ({ children }) => {
   /*  console.log("drawer is called") */
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));
  
    const imageStyle = {
      width: "100%",
      height: "50px",
      objectFit: "cover",
    };
  

  return (
    <Drawer
    className="text-center"
    title={`Cart / ${cart.length} Product`}
    placement="right"
    closable={true}
    onClose={() => {
      dispatch({
        type: "SET_VISIBLE",
        payload: false,
      });
    }}
    visible={drawer}
    style={{justifyContent: "center"}}
  >
    {cart.map((p) => (
      <div key={p._id} className="row" style={{width:"50%", marginLeft: 40}}>
        <div className="col">
          {p.images[0] ? (
            <>
              <img src={p.images[0].url} style={imageStyle} />
              <p className="text-center bg-secondary text-light">
                {p.title} x {p.count}
              </p>
            </>
          ) : (
            <>
              <img src={general} style={imageStyle} />
              <p className="text-center bg-secondary text-light">
                {p.title} x {p.count}
              </p>
            </>
          )}
        </div>
      </div>
    ))}

    <Link to="/cart">
      <button
        onClick={() =>
          dispatch({
            type: "SET_VISIBLE",
            payload: false,
          })
        }
        className="text-center btn btn-primary btn-raised btn-block"
      >
        Go To Cart
      </button>
    </Link>
  </Drawer>
  );
};

export default SideDrawer;
