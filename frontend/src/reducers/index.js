
import {combineReducers} from 'redux';
import {searchReducer} from './searchReducer';

// reducers 
import {userReducer} from './userReducer'
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODReducer";
import {PNPReducer} from "./pickuporderReducer"


const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    couponRedux: couponReducer,
    COD: CODReducer,
    PNP: PNPReducer,
    
}
);

export default rootReducer;