import axios from "axios";


// create a product
export const createProduct = async (product, authToken) => {
    console.log("create Product in connect to backend is called ")
    return await axios.post(
      `${process.env.REACT_APP_API}/product`,product,
      {headers: {
          authToken: authToken
      }}
    );
  };


  export const getAllProducts = async (count) => {

    return await axios.get(
      `${process.env.REACT_APP_API}/products/${count}`,
    );
  }


  export const removeAproduct = async (slug, authToken) => {

    return await axios.delete(
      `${process.env.REACT_APP_API}/product/${slug}`,
      {headers: {
          authToken: authToken
      }}
    );
  };


  export const getAproudct = async (slug) => {

    return await axios.get(
      `${process.env.REACT_APP_API}/product/${slug}`,
    );
  };


  export const updateProduct = async (slug,product, authToken) => {
    console.log("update in product conntbackend is called")
     return await axios.put(
       `${process.env.REACT_APP_API}/product/${slug}`, product,
       {headers: {
           authToken: authToken
       }}
     );
   };

   export const sortProducts = async (sort, order, page) =>
     await axios.post(`${process.env.REACT_APP_API}/products`, {
       sort,
       order,
       page,
     });


    //total product count 
    export const productCount = async(req, res) => {
     return await axios.get(`${process.env.REACT_APP_API}/products/total`)
      
      }
    
    // routes for rating 
    export const productRating = async (productId, star, authToken) => {

      return axios.put(
        `${process.env.REACT_APP_API}/product/star/${productId}`,
        {star},
        {headers: {
          authToken,
        }}
      )
    }


    export const relatedProducts = async(productId) => {
   /*    console.log("relatedProducts in connectbackend is called") */
      return await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)
       }


       export const fetchProductsByFilter = async (arg) => {
       /*   console.log("fetchProductsByFilter is called", arg) */
        return await axios.post(`${process.env.REACT_APP_API}/search/filter`, arg);
       }
      
     
 