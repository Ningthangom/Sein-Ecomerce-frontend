import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { Input, } from 'antd';
const { Search } = Input;


const SearchProductMui = () => {

    let dispatch = useDispatch();
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