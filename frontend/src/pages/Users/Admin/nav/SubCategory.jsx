import React, {useState} from "react";

import { useNavigate } from "react-router-dom";

import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';



const SubCategory = () => {
  
  const [subcategory, setSubCategory] = useState(false);
 
  const handleSubcategoryClick = () => {
    setSubCategory(!subcategory);
  };
  const navigate = useNavigate();

  const handleClickNew = () =>{
    navigate('/admin/subcategory/new');
  }
  const handleClickList = () =>{
    navigate('/admin/subcategory');
  }

  return (
    <div>
    
    {/*  Subcategory.............................................................*/}
        
    <ListItemButton onClick={handleSubcategoryClick}  style={{borderRadius: 10, }}>
          <ListItemText primary="SubCategory" />
          {subcategory? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={subcategory} timeout="auto" unmountOnExit >
          <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 4 }} 
            className="bg-secondary" 
            style={{borderRadius: 10}} 
              onClick={handleClickNew}
            > 
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <ListItemText>New</ListItemText>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}
             onClick={handleClickList}
             className="bg-danger mt-1" style={{borderRadius: 10}}
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

export default SubCategory;
