import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {
    getAllCategories,

} from "../../connectBackend/category";

import { useSelector } from "react-redux";
import {
  createAsubcategory,
} from "../../connectBackend/subcategory";
import { toast } from "react-toastify";
import FormCategory from "../../components/Forms/Form";

import AdminNav from "../Users/Admin/nav/nav";

// media quries
import json2mq from "json2mq";
import useMediaQuery from "@mui/material/useMediaQuery";


const AddSubCategory =  () => {

    const matches = useMediaQuery(
        json2mq({
          minWidth: 500,
        })
      );

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] =useState ("");
    const [categories, setCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
      }, []);

    const loadCategories = () =>
    getAllCategories().then((c) => setCategories(c.data));



    const handleSubmit = (e) => {
        e.preventDefault();
        // send name with token to connectBackend
        createAsubcategory({ name, parent: selectedCategory }, user.token)
          .then((res) => {
            toast.success(` "${name}" was created successfully`);
            setName("");
            navigate('/admin/subcategory')
          })
          .catch((err) => {
            toast.error(`${err.response.data}`);
            setName("");
          });
      };
    return (
   
       
        <div className="container-fluid ">
             <div className="row">
        {matches ? (
          <React.Fragment>
            <div className="col-md-2 ml-3">
              <AdminNav />
            </div>
            <div className="col">
              {/* <p>Admin Dashboard</p> */}
              <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <p>make sure to select a category first !!!</p>
             <FormCategory
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  placeholder="add new subcategory"
                  style={{margin: 20}}
                />
             </div>
        
          </React.Fragment>
        ) : (
          <div className="col">
            {/* <p>Admin Dashboard</p> */}
            <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          
          </div>
          <p>make sure to select a category first !!!</p>
             <FormCategory
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  placeholder="add new subategory"
                  style={{margin: 20}}
                />
        </div>
        )}
      </div>
      </div>
      
    )
}

export default AddSubCategory;