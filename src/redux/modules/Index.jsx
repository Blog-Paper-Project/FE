import { combineReducers } from "redux";
import searchReducer from "./Search";
import bookingReducer from "./Booking";

const rootReducer = combineReducers({
  bookingReducer,
  searchReducer,
  
});

export default rootReducer;
