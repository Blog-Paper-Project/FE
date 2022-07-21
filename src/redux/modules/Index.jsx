import { combineReducers } from "redux";
import searchReducer from "./Search";
import bookingReducer from "./Booking";
import leafReducer from "./Leaf";

const rootReducer = combineReducers({
  bookingReducer,
  searchReducer,
  leafReducer,
  
});

export default rootReducer;
