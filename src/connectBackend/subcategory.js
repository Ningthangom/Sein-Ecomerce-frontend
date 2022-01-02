import axios from "axios";


export const getAllsubCategories = async () => {

     return await axios.get(
       `${process.env.REACT_APP_API}/subcategory`,
      
     );
   }

// get a single category
export const getAsubcategory = async (slug) => {

    return await axios.get(
      `${process.env.REACT_APP_API}/subcategory/${slug}`,
    );
  };

// remove a category
export const removeAsubcategory = async (slug, authToken) => {

    return await axios.delete(
      `${process.env.REACT_APP_API}/subcategory/${slug}`,
      {headers: {
          authToken: authToken
      }}
    );
  };


  // update a subcategory
 export const updateAsubcategory = async (slug,subcategory, authToken) => {
  /*  console.log("update in subcategory conntbackend is called") */
    return await axios.put(
      `${process.env.REACT_APP_API}/subcategory/${slug}`, subcategory,
      {headers: {
          authToken: authToken
      }}
    );
  };


// update a subcategory
 export const createAsubcategory = async (subcategory, authToken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/subcategory`,subcategory,
      {headers: {
          authToken: authToken
      }}
    );
  };