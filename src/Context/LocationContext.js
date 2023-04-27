import createDataContext from "./createDataContext";
import BackEnd from "../API/BackEnd";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "search_rides":
      return { ...state, availableRides: action.payload };
    case "add_ride":
      return { ...state, recording: true };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const searchRides = (dispatch) => {
  return async ({
    destination,
    origin,
    destinationName,
    destinationPlaceId,
    originName,
    originPlaceId,
    vehicleType,
    userId,
  }) => {
    try {
      console.log("-------------- Searching Rides ---------------");
      console.log({
        destination,
        origin,
        destinationName,
        destinationPlaceId,
        originName,
        originPlaceId,
        vehicleType,
        userId,
      });
      const response = await BackEnd.post("/searchRides", {
        destination,
        origin,
        destinationName,
        destinationPlaceId,
        originName,
        originPlaceId,
        vehicleType,
        userId,
      });
      console.log("Axios response:\n");
      console.log(response.data);
      dispatch({ type: "search_rides", payload: response.data });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Could not search rides for the given location",
      });
    }
  };
};

const saveRide = (dispatch) => {
  return async ({
    destination,
    origin,
    destinationPlaceId,
    originPlaceId,
    vehicleType,
    destinationName,
    originName,
    date,
    time,
    userId,
  }) => {
    try {
      console.log({
        destination,
        origin,
        destinationPlaceId,
        originPlaceId,
        vehicleType,
        destinationName,
        originName,
        time,
        date,
        userId,
      });
      const response = await BackEnd.post("/addRide", {
        destination,
        origin,
        destinationPlaceId,
        originPlaceId,
        vehicleType,
        destinationName,
        originName,
        date,
        time,
        userId,
      });

      dispatch({ type: "add_ride", payload: response.data });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Could not add ride",
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  locationReducer,
  { searchRides, saveRide },
  { availableRides: null, recording: false, errorMessage: "" }
);
