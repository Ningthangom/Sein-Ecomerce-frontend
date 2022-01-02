

export const userReducer = (state = null, action) => {
    switch (action.type) {
        // type
        case "LOGGED_IN_USER":
            //payload will be sent here, and update the state
            return action.payload;
        case "LOGGED_OUT": 
            return action.payload
        default:
            return state;
    } 
}