import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  getAllCategories,
  removeAcategory,
  createAcategory,
} from "../../connectBackend/category";

import FormCategory from "../../components/Forms/Form";
import Search from "../../components/Forms/Search";
/* import ModalForm from './ModalForm'; */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import AddCircleIcon from "@mui/icons-material/AddCircle";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();





  const [category, setCategory] = useState(false);

  const [open, setOpen] = useState(false);
  const [handleClose, setHandleClose] = useState(true);

  // serching and filtering
  const [keyword, setKeyWord] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    getAllCategories()
      .then((c) => {
        setCategories(c.data);
        console.log("this is category from: ", c.data)
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
    navigate(`/admin/category/${slug}`);
  };

  const deleteCategory = async (slugfromfunc) => {
    console.log("delete Category is called", slugfromfunc);
    await removeAcategory(slugfromfunc, user.token)
      .then((res) => {
        console.log(res.data);
        toast.success(`category name: "${slugfromfunc}" has been deleted`);
        setOpen(false);
        getCategories();
      })
      .catch((error) => {
        toast.error("Categories could not be deleted");
        setOpen(false);
      });
  };

  // handleAdcategory
  const handleCategoryClick = () => {
    setCategory(!category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // send name with token to connectBackend
    createAcategory({ name }, user.token)
      .then((res) => {
        toast.success(` "${name}" was created successfully`);
        setName("");
        setLoading(false);
        getCategories();
      })
      .catch((err) => {
      /*   toast.error(`${err.response.data}`); */
      toast.error(`Please log out and login again`, err);
        setLoading(false);
        setName("");
      });
  };


  const onClickViewSubs = () => {

  }

  // Search function
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value.toLowerCase());
  };

  // step four
  const searchWithKeyword = (keyword) => (c) =>
    c.name.toLowerCase().includes(keyword);


  return (
    <div className="container-fluid" >
      <div className="row">
        <div className="">{/* <AdminNav /> */}</div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Categories</h4>
          )}
          <ListItemButton
            onClick={handleCategoryClick}
            style={{ borderRadius: 10 }}
            className="btn btn-primary mb-2"
          >
               <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
            <ListItemText primary="Add New Category" />
            {category ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={category} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                style={{ borderRadius: 10 }}
              >
               
                {/* <ListItemText primary="add new category" to="/user/password"/> */}
                <FormCategory
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  placeholder="add new category"
                  style={{width: '100%'}}
                />
              </ListItemButton>
            </List>
          </Collapse>
          <Search
            placeholder="search a category"
            handleSearch={handleSearch}
            keyword={keyword}
          />
          {categories.length > 0 ? (
            categories.filter(searchWithKeyword(keyword)).map((category) => (
              <div key={category._id} className="alert alert-secondary">
                {category.name}
                <Button
                  className="float-right btn btn-sm btn-danger mt-0 pt-1 text-white mr-0"
                  onClick={() => openModal(category.slug)}
                >
                  Del
                </Button>
                <button
                  className=" mr-2 float-right btn btn-sm btn-primary mt-0 pt-2"
                  style={{ justifyContent: "center" }}
                  onClick={() => onClickEdit(category.slug)}
                >
                  Edit
                </button>
             {/*    <button
                  className=" mr-0 float-right btn btn-sm btn-primary mt-0 p-2"
                  style={{ justifyContent: "center" }}
                  onClick={() => onClickViewSubs(category.slug)}
                >
                  subs
                </button> */}

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
