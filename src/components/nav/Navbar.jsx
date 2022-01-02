import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import SearchProductMui from "../../components/Forms/SearchProductMui";
import SearchProduct from "../../components/Forms/SearchProduct";
import { getAuth, signOut } from "firebase/auth";
import {link} from "react-scroll";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Badge from "@mui/material/Badge";

import { useSelector, useDispatch } from "react-redux";

// toast
import { toast } from "react-toastify";
//socket
import { SocketContext } from "../../connectBackend/socketConnect";


const Navbar = () => {
  const { cart } = useSelector((state) => ({ ...state }));
  const user = useSelector((state) => state.user);

  // socket
  const socket = useContext(SocketContext);
 /*  console.log("this is socket from usercontext: ", socket); */
  const [orderNotification, setOrderNotification] = useState([]);

  let dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/admin/dashboard");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    setOrderNotification([]);
    socket.on("newOrderAlert", (payload) => {
      setOrderNotification([ ...orderNotification, payload]);
     /*  console.log("this is order in notification from socket: ", orderNotification) */
    });
  },[]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("logout successful");
      })
      .catch((error) => {
        // An error happened.
        toast.error("something went wrong");
       /*  console.log(error); */
      });

    dispatch({
      type: "LOGGED_OUT",
      payload: null,
    });

    navigate("/login");
  };

  const handleNotification = () => {
    setOrderNotification([])
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-primary"
      style={{
        /*   position:"sticky", */
        top: "0",
      }}
    >
      <div className="container-fluid">
        <Link smooth={true} to="/" className="navbar-brand" href="#">
          Store
        </Link>
        <Link smooth={true} to="/cart" className="navbar-brand" href="#">
          <Badge
            badgeContent={cart ? cart.length : 0}
            color="error"
            className="ml-4"
          >
            <AddShoppingCartIcon />
          </Badge>
        </Link>
        {user && user.role === "admin" ? (
          <Link
            smooth={true}
            to="/admin/orders"
            className="navbar-brand"
            href="#"
            onClick={handleNotification}
          >
            <Badge
              badgeContent={orderNotification.length ? " " : null}
              color="error"
              className="ml-4"
            >
              <NotificationsActiveIcon />
            </Badge>
          </Link>
        ) : null}
        <div className="ml-4">
          <SearchProductMui />
        </div>

        {/*     <SearchProduct/>
         */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse navbaritems"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ml-auto">
            {user && user.role === "admin" ? (
              <li className="nav-item " style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={handleHome}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  Dashboard
                </span>
              </li>
            ) : null}
             {user ? (
              <li className="nav-item " style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={() => navigate('/user/wishlist')}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                 wishlist
                </span>
              </li>
            ) : null}
            {user && user.role === "admin" ? (
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={() => navigate("/admin/orders")}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  orders
                </span>
              </li>
            ) : null}
            {user && user.role === "customer" ? (
              <li className="nav-item active" style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={() => navigate("/user/history")}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  my orders
                </span>
              </li>
            ) : null}

            {/*   {user ? (
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={handleProfile}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  Profile
                </span>
              </li>
            ) : null} */}
            {user ? (
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={handleLogout}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  logout{" "}
                </span>
              </li>
            ) : (
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={handleLogin}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  Log in
                </span>
              </li>
            )}
            {user ? null : (
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <span
                  smooth={true}
                  onClick={() => navigate("/register")}
                  className="nav-link navbar-toggler"
                  data-bs-target="#navbarNavDropdown"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  Register
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
