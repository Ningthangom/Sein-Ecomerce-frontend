import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { createProduct } from "../../connectBackend/product";
import ProductForm from "../../components/Forms/ProductForm";
import ImageUpload from "../../components/Forms/ImageUpload";
import {
  getAllCategories,
  getSubCategories,
} from "../../connectBackend/category";



const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategories: [],
  shipping: "",
  measurement: "",
  quantity: "",
  images: [],
  colors: [
    "Yellow",
    "Red",
    "Brown",
    "Silver",
    "White",
    "Blue",
    "Black",
    "others",
  ],
  brand: "",
  color: "Red",
};

const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    setValues(initialState);
  }, []);

  // destructing state
  const { title } = values;

  // get all categories
  const loadCategories = () =>
    getAllCategories().then((c) =>
      setValues({ ...values, categories: c.data })
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle Submit is called");
    createProduct(values, user.token)
      .then((res) => {
        console.log(res.data);
        toast.success(`${title} is posted successfully`);
        setValues(initialState);
        console.log("this is initialState after posting product", initialState);
        navigate("/admin/products");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("please logout and log in again");
        }
        toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubcategory = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    // everytime a category is selected, sub category option will be set to emty array
    setValues({ ...values, subcategories: [], category: e.target.value });
    getSubCategories(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
        setShowSub(true);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("please select a valid category");
        }
      });
  };

  return (
    <div className="contianer-fluid">
        <h4>What do you want to sell today?</h4>
         {loading ? (<h4 className="text-danger">Loading ...</h4>) : (null
              )}
      <div className="p-3">
        <ImageUpload 
        values={values} 
        setValues={setValues} 
        setLoading={setLoading}
        />
      </div>
      <ProductForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleSubcategory={handleSubcategory}
        setValues={setValues}
        subOptions={subOptions}
        showSub={showSub}
        values={values}
      />
    </div>
  );
};

export default CreateProduct;
