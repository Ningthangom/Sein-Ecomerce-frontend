import React from 'react';
import { styled, } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { Input, Space } from 'antd';
const { Search } = Input;





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
       /*  console.log(e.target.value); */
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