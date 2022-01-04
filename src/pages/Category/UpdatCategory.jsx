import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  getAcategory,
  updateAcategory,

} from "../../connectBackend/category";

import FormCategory from '../../components/Forms/Form'


const UpdateCategory = () => {
  const [name, setName] = useState("");


  const navigate = useNavigate();



  const { user } = useSelector((state) => ({ ...state }));
  const {slug} = useParams();

  useEffect(() => {
    loadACategory();
  }, []);

  const loadACategory = async () => {

        await getAcategory(slug, user.token)
        .then((res) => {
            console.log(res.data.name)
            setName(res.data.name);
        })
        .catch((err) => {
            toast.error(`couldn't get ${slug} category detail`)
        })
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // send name with token to connectBackend
    updateAcategory(slug,{name}, user.token)
      .then((res) => {
        toast.success(` "${name}" was created successfully`);
        setName("");
       
        navigate('/admin/dashboard')
      })
      .catch((err) => {
        toast.error(`${err.response.data}`);
       
        setName('');
      });
  };


  return (
    <div className="m-3">
       <FormCategory handleSubmit = {handleSubmit} name={name} setName={setName} />
    </div>
  );
};



export default UpdateCategory;
