import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css'

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

// components

/* import Navbar from "./components/nav/menu/ManinNav"; */
import Navbar from "./components/nav/Navbar";

// firebase
import { auth } from "./firebase";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

// redux
//This useDispatch hook returns a reference to the dispatch function from
// the Redux store. You may use it to dispatch actions as needed.
import { useDispatch, useSelector } from "react-redux";

import { currentUser } from "./connectBackend/auth";

import SideDrawer from "./components/drawer/SideDrawer";

// socket
import { SocketContext, socket } from "./connectBackend/socketConnect";
import { App } from "./components/routes/routes";

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  /*  console.log("this is user: ", user); */

  /*  const routing = useRoutes(App(isProtected)); */

  useEffect(() => {
    /*  console.log("useEffect is run") */
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        /*  console.log("user in App: ", user) */
        const idTokenResult = await getIdTokenResult(user);
        /* console.log("this is idtoken : ", idTokenResult); */

        currentUser(idTokenResult.token)
          .then((res) => {
            // this res is coming back from the backend
            /*  console.log("res coming back from the backend", res); */
            // send the data to redux state
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                shippingInfo: res.data.shippingInfo,
              },
            });
          })
          .catch((err) => {
            console.log("sending token to backend did not work", err);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className="col text-center p-5">____Sein is L<LoadingOutlined/>ading____ </div>
    }>
      <Router>
        <SocketContext.Provider value={socket}>
          <Navbar />
          <SideDrawer />
          <ToastContainer />
          <App isProtected={user} />
        </SocketContext.Provider>
      </Router>
    </Suspense>
  );
};

export default AppWrapper;
