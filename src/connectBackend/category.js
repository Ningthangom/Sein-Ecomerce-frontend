import axios from "axios";


export const getAllCategories = async () => {

     return await axios.get(
       `${process.env.REACT_APP_API}/category`,
      
     );
   }

// get a single category
export const getAcategory = async (slug) => {

    return await axios.get(
      `${process.env.REACT_APP_API}/category/${slug}`,
    );
  };

// remove a category
export const removeAcategory = async (slug, authToken) => {

    return await axios.delete(
      `${process.env.REACT_APP_API}/category/${slug}`,
      {headers: {
          authToken: authToken
      }}
    );
  };


  // update a category
 export const updateAcategory = async (slug,category, authToken) => {
   console.log("update in category conntbackend is called")
    return await axios.put(
      `${process.env.REACT_APP_API}/category/${slug}`, category,
      {headers: {
          authToken: authToken
      }}
    );
  };


// update a category
 export const createAcategory = async (category, authToken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/category`,category,
      {headers: {
          authToken: authToken
      }}
    );
  };


// get sub categories
export const getSubCategories = async (id) => {
    console.log("cate id in getSubcate: ", `${id}`)
  return await axios.get(
    `${process.env.REACT_APP_API}/category/subcategory/${id}`,
  )
};