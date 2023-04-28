import React from "react";
import { StyleSheet } from "react-native";
import UserRideScreen from "../Components/UserRideScreen";
import { Context as AuthContext } from "../Context/AuthContext";

const MyRideBookedScreen = () => {
  const { state: {userInfo} } = React.useContext(AuthContext);
  const { booked_rides } = userInfo.rideHistory
  const { payload } = userInfo;

  React.useEffect(() => {
    console.log(
      "00------------------------------ My Booked Ride Screen ------------------------------00"
    );
    console.log(booked_rides);
  }, [booked_rides]);
  return (
    booked_rides[0] !== undefined ? <UserRideScreen
      title="My Booked Rides"
      origin={booked_rides[0].originName}
      destination={booked_rides[0].destinationName}
      date={booked_rides[0].date}
      time={booked_rides[0].time}
      name={"Hari Dahal"}
      nameLabel={"Rider Name"}
      phoneNumber={"+977 9871234560"}
      phoneLabel={ "Phone Number" }
      showUserInfo={true}
      vehicleModel={booked_rides[0].vehicleType}
      vehicleModelName="Vehicle Model"
    />: null
  );
};

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MyRideBookedScreen;
