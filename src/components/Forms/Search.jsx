import React from 'react';

const Search = ({keyword, handleSearch, placeholder}) => {

    return (
      
        <input 
        type ="search" 
        placeholder={placeholder}
        value={keyword} 
        onChange={handleSearch}
        className="form-control mb-4"  /> 
    )


}


export default Search;