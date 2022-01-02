import React, {useState} from "react";

import { Link, useNavigate } from "react-router-dom";

import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';


const ProductNav = () => {

  const [product, setProduct] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
   
    setProduct(!product);
  };

  const handleClickNew = () => {
    navigate("/admin/product/new")
  }
  const handleClickList = () => {
    navigate("/admin/dashboard")
  }

  return (
    <div>
        {/* Products ................................................ */}
        <ListItemButton onClick={handleProductClick}  style={{borderRadius: 10, }}>
          <ListItemText primary="Product" />
          {product ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={product} timeout="auto" unmountOnExit >
          <List component="div" disablePadding >
            <ListItemButton 
            sx={{ pl: 4 }} 
            className="bg-secondary"
            onClick={handleClickNew} 
            style={{borderRadius: 10}}> 
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <ListItemText>New</ListItemText>
            </ListItemButton>
         
           
          </List>
          <List component="div" disablePadding>
            <ListItemButton
             sx={{ pl: 4 }} 
             className="bg-danger mt-1" 
             style={{borderRadius: 10}}
             onClick={handleClickList}
             >
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <ListItemText>List</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
    </div>
  );
};

export default ProductNav;
