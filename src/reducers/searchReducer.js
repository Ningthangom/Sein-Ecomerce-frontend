export const searchReducer = (state = {text: ""}, action) => {
    switch(action.type){
        case "SEARCH_QUERY": 
        // spreading out action.payload is for when you have multiple state 
        // eg. state = {text: "", submitted = true}
        return {...state, ...action.payload};
        default: 
        return state;
    }
}