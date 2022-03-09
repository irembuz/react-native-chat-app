import { Platform } from "react-native";
import { auth, googleAuthProvider } from "../firebaseConfig";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const signInWithEmailAndPassword =
  (email, password, navigation) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNIN_REQUEST });

      auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result && result.user) {
            dispatch({
              type: USER_SIGNIN_SUCCESS,
              payload: result.user,
            });
            if (Platform.OS === "web") {
              localStorage.setItem("userInfo", JSON.stringify(result.user));
            }
            navigation.navigate("Chats");
          } else {
            dispatch({
              type: USER_SIGNIN_FAIL,
              payload: "Hata meydana geldi.",
            });
          }
        })
        .catch((error) => {
          // firebase'den ayni sekilde error.response.data.message seklinde gelmiyor olabilir.
          dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const continueWithGoogle = (navigation) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });

    auth
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        if (result && result.user) {
          dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: result.user,
          });
          if (Platform.OS === "web") {
            localStorage.setItem("userInfo", JSON.stringify(result.user));
          }
          navigation.navigate("Chats");
        } else {
          dispatch({
            type: USER_SIGNIN_FAIL,
            payload: "Hata meydana geldi.",
          });
        }
      })
      .catch((error) => {
        // firebase'den ayni sekilde error.response.data.message seklinde gelmiyor olabilir.
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = (navigation) => (dispatch) => {
  try {
    auth.signOut().then(() => {
      if (Platform.OS === "web") {
        localStorage.removeItem("userInfo");
      }
      dispatch({ type: USER_SIGNOUT });
      navigation.navigate("Login");
    });
  } catch (error) {
    console.log("firebase signOut error: ", error);
    if (Platform.OS === "web") {
      localStorage.removeItem("userInfo");
    }
    dispatch({ type: USER_SIGNOUT });
  }
};
