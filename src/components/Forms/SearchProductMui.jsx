import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {SearchOutlined} from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;



/* const Search = styled('form')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: 160,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  })); */

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 0, 1, 1),
      // vertical padding + font size from searchIcon
      paddingRight: `calc(1em + ${theme.spacing(1)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const SearchProductMui = () => {

    let dispatch = useDispatch();
    const {search} = useSelector((state) => ({...state}))
    // as the search state in reducer has text property that can be destructured  
    const {text} = search;
    const nav = useNavigate();

    const handleChange = e => {
        //will get the inputtext and push it to redux reducer
        console.log(e.target.value);
        dispatch({
            type: "SEARCH_QUERY",
            // make sure to put it in text object
            payload: {text: e.target.value}
        })
        nav(`/shop?${e.target.value}`)
    }


    const handleSubmit = value => {
        
        nav(`/shop?${value}`);
    }


    return (


    <Search 
    className="primary form-input"
    placeholder="Search ............" 
    onSearch={handleSubmit}
    style={{ width: 250 }}
    size='large'
    onChange={e => handleChange(e)}
    enterButton />




    )
}

export default SearchProductMui;