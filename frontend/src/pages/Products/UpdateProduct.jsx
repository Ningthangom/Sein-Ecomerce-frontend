import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-toastify";

import ImageUpload from "../../components/Forms/ImageUpload";

import {useSelector} from 'react-redux';

import {
  getAllCategories,
  getSubCategories,
} from "../../connectBackend/category";
import { getAproudct,updateProduct } from "../../connectBackend/product";

import ProductUpdateForm from '../../components/Forms/ProuductUpdateForm'

    const initialState = {
              title: "",
              description: "",
              price: "",
             /*  categories: [], */
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
              color: "",
            };

const UpdateProduct = () => {

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state) => ({ ...state }))

  const navigate = useNavigate();

  const {slug} = useParams();

  
  useEffect(() => {
    loadCategories();
    loadProductDetail();
  }, []);



 const loadCategories = () =>
    getAllCategories().then((c) =>
    setCategories(c.data)
    );


    const handleCatagoryChange = (e) => {
      e.preventDefault();
      console.log("CLICKED CATEGORY", e.target.value);
      setValues({ ...values, subcategories: [], category: e.target.value });
      setSelectedCategory(e.target.value);
      getSubCategories(e.target.value).then((res) => {
        console.log("SUB OPTIONS ON CATGORY CLICK", res);
        setSubOptions(res.data);
      });
       // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProductDetail();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
     
    };
  
  const loadProductDetail = () => {
    getAproudct(slug)
    .then((p) => {
      console.log("this is prduct detail: ", p.data)
      setValues({...values, ...p.data});
      /* console.log("this are objects of product", values); */
       // 2 load single product category subs
       getSubCategories(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
        /* console.log("this is subcategories of product category", res.data) */
      });
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
   
      p.data.subcategories.map((s) => {
       /*  console.log("this is id of sub: ", s._id) */
          arr.push(s._id);
      });
     /*  console.log("ARR", arr); */
      setArrayOfSubs(arr); // required for ant design select to work
      console.log("array of subs: ", arrayOfSubs)
    })
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle Submit is called");
    setLoading(true);
    values.subcategories = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(slug, values, user.token)
      .then((res) => {
        console.log(res.data);
        toast.success(`${res.data.title} is posted successfully`);
        setValues(initialState);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("please logout and log in again");
        }
        toast.error(err.response.data);
      });
  };
  
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/admin/products');
  }
  
  return (
    <div className="container-fluid">
      <div className="p-2">
       <div className="col-md-12">
          {loading ? (
            <h4 className="text-danger"> Loading .....</h4>
          ) : (
            <h4>Product update</h4>
          )}
        <ImageUpload 
        values={values} 
        setValues={setValues} 
        setLoading={setLoading}
        />
      </div>
     
        <ProductUpdateForm
         handleSubmit={handleSubmit}
         handleChange={handleChange}
         setValues={setValues}
         values={values}
         handleCatagoryChange={handleCatagoryChange}
         categories={categories}
         subOptions={subOptions}
         arrayOfSubs={arrayOfSubs}
         setArrayOfSubs={setArrayOfSubs}
         selectedCategory={selectedCategory}
         handleCancel={handleCancel}
       
      />
      </div>
      
      </div>
     
      
    
   
  );
};



export default UpdateProduct;
