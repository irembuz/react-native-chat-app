import { Platform } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userSigninReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userSignin: userSigninReducer,
});

let userInfoFromLocalStorage = {};
if (Platform.OS === "web") {
  userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
} else {
  userInfoFromLocalStorage = {};
}

const initialState = {
  userSignin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
