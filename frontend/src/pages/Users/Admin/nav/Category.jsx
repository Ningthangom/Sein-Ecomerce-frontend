import React, {useState} from "react";

import { Link } from "react-router-dom";

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

import { Menu } from "antd";
const { SubMenu, Item } = Menu;

const CategoryNav = () => {
  const [category, setCategory] = useState(false);

  
  const handleCategoryClick = () => {
   
    setCategory(!category);
  };
  return (
    <div>
      {/* Category.............................................................. */}
        <ListItemButton onClick={handleCategoryClick}  style={{borderRadius: 10, }}>
          <ListItemText primary="Category" />
          {category ? <ExpandLess /> : <ExpandMore />}
          
        </ListItemButton>
        <Collapse in={category} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} className="bg-danger mb-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white">List</Link>
            </ListItemButton>
          </List>
          <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 4 }} className="bg-secondary" style={{borderRadius: 10}}> 
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/admin/category" className="text-white" >New</Link>
            </ListItemButton>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} className="bg-primary mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white">edit</Link>
            </ListItemButton>
          </List>
            <ListItemButton sx={{ pl: 4 }} className="bg-danger mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <DeleteOutlineIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white" >remove</Link>
            </ListItemButton>
          </List>
         
        </Collapse>
    </div>
  );
};

export default CategoryNav;
