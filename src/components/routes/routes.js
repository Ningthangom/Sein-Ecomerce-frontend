import React, {useEffect, useState, lazy, Suspense} from "react";
import {
    useRoutes,
    Outlet
  } from "react-router-dom";
  import { currentAdmin } from "../../connectBackend/auth";
  // auth
const TestLogin = lazy(() => import('../../pages/Auth/TestLogin') ) 
const Register = lazy(() => import("../../pages/Auth/Register") ) ;
const RegisterComplete = lazy(() => import("../../pages/Auth/RegisterComplete") ) ;
const ForgotPassword = lazy(() => import("../../pages/Auth/ForgotPassword") ) ;
const Home = lazy(() => import ("../../pages/Home") ) ;

// Admin components
const AdminDashBoard = lazy(() => import ("../../pages/Users/Admin/dashboard")) 
const Category = lazy(() => import ("../../pages/Users/Admin/Category")) 
const SubCategory = lazy(() => import("../../pages/Users/Admin/SubCategory") ) 
const AddSubCategory = lazy(() => import("../../pages/SubCategory/AddSubCategory") ) 

//admin product
const CreateProductAdmin = lazy(() => import("../../pages/Users/Admin/Product/CreateProductAdmin") ) 
const ListProducts = lazy(() => import ("../../pages/Products/ListProducts") )
const UpdateProductAdmin = lazy(() => import  ("../../pages/Users/Admin/Product/UpdateProductAdmin"))

const UpdateSubCategory = lazy(() => import("../../pages/SubCategory/UpdateSubcategory") ) 
const OrdersAdmin = lazy(() => import("../../pages/Users/Admin/OrdersAdmin") ) 
const UpdateCategory = lazy(() => import ('../../pages/Category/UpdatCategory')) 




// user
const History = lazy(() => import("../../pages/Users/Customer/History")) ;
const Password = lazy(() => import("../../pages/Users/Customer/Password")) ;
const Wishlist = lazy(() => import("../../pages/Users/Customer/Wishlist")) 
const Payment = lazy(() => import ("../../pages/Stripe/Payment")) ;

// Admin routes
const LoadingToRedirect = lazy(() => import('./LoadingToRedirect')) ;
const CreateCouponPage = lazy(() => import('../../pages/Users/Admin/coupon/CreateCoupon')) 
const SalesPage = lazy(() => import('../../pages/Users/Admin/sales/salespage') ) 
const PickupOrders = lazy(() => import('../order/PickupOrders')) 

//general 
const ProductDetail = lazy(() => import ("../../pages/ProductDetail"))
const CategoryHome = lazy(() => import ('../../components/Category/CategoryHome'))
const SubProducts = lazy(() => import('../../components/Subcategories/SubProducts')) 
const SearchProduct = lazy(() => import('../../components/Forms/SearchProduct')) 
const Shop = lazy(() => import('../../pages/Shop')) 
const Cart = lazy(() => import('../../pages/Cart')) 
const CheckOut = lazy(() => import('../../pages/CheckOut')) 




export const App = ({isProtected}) => {

    /* const object = isProtected; */
      /* console.log("isProtected", object); */
      const [isAdmin , setIsAdmin] = useState(false);

      useEffect(() => {
         /*  console.log("useEffect in routes is called") */
      if(isProtected && isProtected.token) {
        currentAdmin(isProtected.token)
        .then((res) => {
         /*  console.log("current admin", res) */
          setIsAdmin(true);
        })
        .catch((err) => {
          /* console.log("Admin route error in routes", err); */
          setIsAdmin(false);
        })
      }
  
  
    }, [isProtected])



    let routes = useRoutes([
      { path: "/", element: <Home /> },
      { path: "/login", element: <TestLogin /> },
      { path: "/register", element: <Register /> },
      { path: "/register/complete", element: <RegisterComplete /> },
      { path: "/forgot/password", element: <ForgotPassword /> },
      { path: "/user", element: isProtected !== null ?  <Outlet /> 
        : <LoadingToRedirect />,
       children: [
          {path: "/user/history", element: <History />},
          {path: "/user/password", element: <Password />},
          {path: "/user/wishlist", element: <Wishlist />}, 
          {path: "/user/checkout", element: <CheckOut />}, 
          {path: "/user/payment", element: <Payment />}, 
      ]},
      { path: "/admin", element: isAdmin ?  <Outlet /> 
      : <LoadingToRedirect />,
     children: [
        {path: "/admin/dashboard", element:  <AdminDashBoard />},
        {path: "/admin/orders", element:  <OrdersAdmin />},
        {path: "/admin/category/:slug", element:  <UpdateCategory />},
        {path: "/admin/category", element:  <Category />},
        {path: "/admin/subcategory", element:  <SubCategory />},
        {path: "/admin/subcategory/new", element:  <AddSubCategory />},
        {path: "/admin/subcategory/:slug", element:  <UpdateSubCategory />},
        {path: "/admin/product/new", element:  <CreateProductAdmin />},
        {path: "/admin/products", element:  <ListProducts />},
        {path: "/admin/products/update/:slug", element:  <UpdateProductAdmin />},
        {path: "/admin/coupon/new", element:  <CreateCouponPage />},
        {path: "/admin/sales", element:  <SalesPage />},
        {path: "/admin/pickuporders", element:  <PickupOrders />},

    ]},
    // product routes 
    { path: "/product/:slug", element: <ProductDetail />},
      
      // ...
    // category routes 
    { path: "/category/:slug", element: <CategoryHome />},
    //subcategory products
    { path: "/subcategory/:slug", element: <SubProducts />},
    
    // search
    {path:'/shop?', element: <SearchProduct />},
    {path:'/shop', element: <Shop />},
    {path: '/cart', element: <Cart />}


    ]);
    return  routes;
    ;
  };