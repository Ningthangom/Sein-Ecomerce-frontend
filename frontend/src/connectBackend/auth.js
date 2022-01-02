
import axios from "axios";

// send token to the back end
 export const createOrUpdateUser = async (authToken) => {
    /*  console.log("createOrUpdateUser is called")
      console.log("this is process env", process.env.REACT_APP_API) */
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          authToken: authToken,
        },
      }
    );
  };

  // send token to the back end
 export const currentUser = async (authToken) => {
 /*  console.log("current user is called")
  console.log("this is process env", process.env.REACT_APP_API)  */
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

  // send token to the back end
export const currentAdmin = async (authToken) => {
   /*  console.log("current Admin is called")
    console.log("this is process env", process.env.REACT_APP_API)  */
    return await axios.post(
      `${process.env.REACT_APP_API}/current-admin`,
      {},
      {
        headers: {
          authToken: authToken,
        },
      }
    );
  };


