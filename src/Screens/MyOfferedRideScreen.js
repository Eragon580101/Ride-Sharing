import React from "react";
import { StyleSheet } from "react-native";
import UserRideScreen from "../Components/UserRideScreen";
import { Context as AuthContext } from "../Context/AuthContext";

const MyOfferedRideScreen = () => {
  const { state: {userInfo} } = React.useContext(AuthContext);
  const { offered_rides } = userInfo.rideHistory
  const { payload } = userInfo;
  console.log(
    "00------------------------------ My Offered Ride Screen ------------------------------00"
  );
  console.log(offered_rides);

  React.useEffect(() => {
    console.log(
      "00------------------------------ My Offered Ride Screen ------------------------------00"
    );
    console.log(offered_rides);
  }, [offered_rides]);

  return (
    offered_rides? offered_rides[0] !== undefined ?<UserRideScreen
      status="Offered"
      nameLabel="Name"
      phoneNumber={payload.phoneNumber}
      phoneLabel={"Phone Number"}
      date={offered_rides[0].date}
      time={offered_rides[0].time}
      origin={offered_rides[0].originName}
      destination={offered_rides[0].destinationName}
      showUserInfo={offered_rides.rideType === "book"}
      name={payload.first_name + " " + payload.last_name}
      handleNo={() => console.log("no")}
      handleYes={() => console.log("yes")}
    />:null:null
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyOfferedRideScreen;
