import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackEnd from "../API/BackEnd";
import { navigateTo } from "../navigationRef";
import CookieManager from "@react-native-cookies/cookies";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };

    case "signin":
      return {
        ...state,
        errorMessage: "",
        userInfo: action.payload,
        isSignedIn: true,
      };

    case "local_signin":
      return {
        ...state,
        errorMessage: "",
        token: action.payload,
        isSignedIn: true,
      };

    case "clear_error_message":
      return { ...state, errorMessage: "" };

    case "sign_out":
      return {
        ...state,
        token: null,
        errorMessage: "",
        isSignedIn: false,
        OTPInfo: null,
        userInfo: null,
      };

    case "verify_otp":
      return { ...state, errorMessage: "", OTPInfo: action.payload };

    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  console.log("clearing error message");
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async (profile) => {
  try {
    console.log("------------------ Dispatching Sign Up ------------------");
    const response = await BackEnd.post("/createuser/", profile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Axios response:\n");
    console.log(response.data);
    await AsyncStorage.setItem("token", response.data.access);
    dispatch({ type: "signin", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup",
    });
  }
};

const signin =
  (dispatch) =>
  async ({ phoneNumber }) => {
    try {
      const response = await BackEnd.post("/login", { phoneNumber });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.access);
      console.log("tokenStored");
      console.log("SignedIn");
      console.log(
        "____________________getting data signing in____________________"
      );
      console.log(response.data);
      dispatch({ type: "signin", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Sign In",
      });
    }
  };

const tryLocalSigin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    console.log("tokenFound");
    dispatch({ type: "signin", payload: token });
    console.log("SignedIn");
    console.log("____________________getting data____________________");
    const response = await BackEnd.post("/jwt", { token });
    console.log(response.data);
    dispatch({ type: "signin", payload: response.data });
  }
};

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    console.log("tokenRemoved");
    dispatch({ type: "sign_out" });
  } catch (error) {
    console.log(error);
  }
};

const sendOTP =
  (dispatch) =>
  async ({ phoneNumber }) => {
    try {
      const response = await BackEnd.post("/sendotp", { phoneNumber });
      dispatch({ type: "verify_otp", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Sign In",
      });
    }
  };

const verifyOTP =
  (dispatch) =>
  async ({ phoneNumber, otp }) => {
    try {
      const response = await BackEnd.post("/verifyotp", { phoneNumber, otp });
      dispatch({ type: "verify_otp", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Sign In",
      });
    }
  };

const sendRiderInfo = (dispatch) => async (riderInfo) => {
  try {
    const response = await BackEnd.post("/riderinfo", riderInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Rider Info Axios response:\n");
    console.log(response.data);
    dispatch({ type: "verify_otp", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "add_error",

      payload: "Something went wrong with Sign In",
    });
  }
};
const sendVehicleInfo = (dispatch) => async (vehicleInfo) => {
  try {
    const response = await BackEnd.post("/vehicleinformation", vehicleInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Vehicle Info Axios response:\n");
    console.log(response.data);
    dispatch({ type: "signin", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "add_error",

      payload: "Something went wrong with Sign In",
    });
  }
};

const clearOTPState = (dispatch) => () => {
  console.log("------------------- clearing OTP state --------------------");
  dispatch({ type: "verify_otp", payload: null });
};

// Cheating
const updateState = (dispatch) => async (formData) => {
  try {
    const response = await BackEnd.post("/rideStatus", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Ride Status Axios response:\n");
    console.log(response.data);
    dispatch({ type: "signin", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "add_error",

      payload: "Something went wrong with Sign In",
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    clearErrorMessage,
    tryLocalSigin,
    signout,
    sendOTP,
    verifyOTP,
    sendRiderInfo,
    sendVehicleInfo,
    clearOTPState,
    updateState
  },
  {
    token: null,
    errorMessage: "",
    userInfo: null,
    OTPInfo: null,
    isSignedIn: false,
  }
);
