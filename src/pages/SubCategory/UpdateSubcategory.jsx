import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  getAsubcategory,
  updateAsubcategory,

} from "../../connectBackend/subcategory";
import {
    getAllCategories,

} from "../../connectBackend/category";

import FormCategory from '../../components/Forms/Form'


const UpdateSubCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState("");

  const navigate = useNavigate();



  const { user } = useSelector((state) => ({ ...state }));
  const {slug} = useParams();

  useEffect(() => {
    getCategories();
    loadAsubCategory();
  }, []);

  const getCategories = async () => {
      await getAllCategories()
      .then((res) => {
          setCategories(res.data)
      }) 
      .catch((err) => {
          console.log(err);
      })
  }

  const loadAsubCategory = async () => {

        await getAsubcategory(slug, user.token)
        .then((res) => {
           /*  console.log(res.data.name) */
            setName(res.data.name);
            setParent(res.data.parent);
        })
        .catch((err) => {
            toast.error(`couldn't get ${slug} category detail`)
        })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // send name with token to connectBackend
    updateAsubcategory(slug,{name,parent}, user.token)
      .then((res) => {
        toast.success(` "${name}" was updated successfully`);
        setName("");
        setLoading(false);
        navigate('/admin/subcategory')
      })
      .catch((err) => {
        toast.error(`${err.response.data}`);
        setLoading(false);
        setName('');
      });
  };


  return (
    <div className="m-3">
        <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
         {/*  <AdminNav /> */}
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update sub category</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
       <FormCategory handleSubmit = {handleSubmit} name={name} setName={setName} />
       </div>
       </div>
       </div>
    </div>
  );
};



export default UpdateSubCategory;
