import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
    getAllsubCategories,
  removeAsubcategory,
 
} from "../../connectBackend/subcategory";


import Search from "../../components/Forms/Search";
/* import ModalForm from './ModalForm'; */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";




const AddCategory = () => {
 
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubCategories] = useState([]);
 
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();


  const [open, setOpen] = useState(false);
  const [handleClose, setHandleClose] = useState(true);

  // serching and filtering
  const [keyword, setKeyWord] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getsubCategories();
  }, []);



  const getsubCategories = () => {
    getAllsubCategories()
      .then((c) => {
        setSubCategories(c.data);
        /* console.log(c.data) */
      })
      .catch((error) => {
        toast.error("Categories could not be loaded");
        console.log(error);
      });
  };

  const openModal = async (slugName) => {
    setSlug(slugName);
    setOpen(true);
    setHandleClose(false);
  };

  const cancelDelete = () => {
    setOpen(false);
  };

  const onClickEdit = (slug) => {
    navigate(`/admin/subcategory/${slug}`);
  };

  const deleteCategory = async (slugfromfunc) => {
    console.log("delete Category is called", slugfromfunc);
    await removeAsubcategory(slugfromfunc, user.token)
      .then((res) => {
        console.log(res.data);
        toast.success(`category name: "${slugfromfunc}" has been deleted`);
        setOpen(false);
        getsubCategories();
      })
      .catch((error) => {
        toast.error("Categories could not be deleted");
        setOpen(false);
      });
  };

 

  // Search function
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value.toLowerCase());
  };

  // step four
  const searchWithKeyword = (keyword) => (c) =>
    c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid" ml-0>
      <div className="row">
        <div className=""></div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>SubCategories</h4>
          )}
          
          <Search
            placeholder="search a subcategory"
            handleSearch={handleSearch}
            keyword={keyword}
          />
          {subcategories.length > 0 ? (
            subcategories.filter(searchWithKeyword(keyword)).map((category) => (
              <div key={category._id} className="alert alert-secondary">
                {category.name}
                <Button
                  className="float-right btn btn-sm btn-danger mt-0 pt-1 text-white"
                  onClick={() => openModal(category.slug)}
                >
                  Delete
                </Button>
                <button
                  className=" mr-3 float-right btn btn-sm btn-primary mt-0 pt-1"
                  style={{ justifyContent: "center" }}
                  onClick={() => onClickEdit(category.slug)}
                >
                  Edit
                </button>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{
                    backgroundColor: "transparent",
                    filter: "brightness 50%",
                  }}
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Deleting {`${slug}`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you want to delete it?
                    </Typography>

                    <Button
                      className="float-right btn btn-sm btn-danger mt-2 pt-1 text-white"
                      onClick={() => deleteCategory(slug)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="float-right btn btn-sm btn-danger mt-2 pt-1 text-white mr-2"
                      onClick={() => cancelDelete()}
                    >
                      cancel
                    </Button>
                  </Box>
                </Modal>
              </div>
            ))
          ) : (
            <div>
              <p>No category found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default AddCategory;
