import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {SearchOutlined} from '@ant-design/icons';


const SearchProduct = () => {

    let dispatch = useDispatch();
    const {search} = useSelector((state) => ({...state}))
    // as the search state in reducer has text property that can be destructured  
    const {text} = search;
    const nav = useNavigate();

    const handleChange = (e) => {
        //will get the inputtext and push it to redux reducer
        dispatch({
            type: "SEARCH_QUERY",
            // make sure to put it in text object
            payload: {text: e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        nav(`/shop?${text}`);
    }

    return (
       <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}   >
           <input 
           type="search" 
           value={text} 
           onChange={handleChange}
           className="form-control mr-sm-0" 
           placeholder="Search" />
           <SearchOutlined onClick={handleSubmit} style={{cursor: 'pointer'}} />
       </form>
    )

}

export default SearchProduct;