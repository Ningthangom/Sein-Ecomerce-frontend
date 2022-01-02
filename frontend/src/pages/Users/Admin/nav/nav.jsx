import React, {useState} from "react";

import { Link } from "react-router-dom";


import CategoryNav from './Category'
import ProductNav from './Product'
import SubCategory from './SubCategory'


const AdminNav = () => {
 
  return (
    <nav>
      <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link btn btn-primary text-white">
            Dashboard
          </Link>
        </li>
      <ul className="nav flex-column mt-2 cl-2">
      <li className="nav-item">
          <Link to="/admin/category" className="nav-link btn btn-primary text-white">
           category
          </Link>
        </li>
        <ProductNav />
       <SubCategory/>
      {/*  <li className="nav-item">
          <Link to="/admin/subcategory" className="nav-link btn btn-primary text-white">
           subcategory
          </Link>
        </li> */}
     {/* orders................................................................. */}
        <li className="nav-item">
          <Link to="/admin/coupon/new" className="nav-link btn btn-primary text-white">
            coupon
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/sales" className="nav-link btn btn-primary text-white">
            sales
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password" className="nav-link btn btn-primary text-white">
            password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
