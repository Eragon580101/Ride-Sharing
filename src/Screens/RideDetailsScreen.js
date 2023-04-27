import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  TouchableOpacity,
  View,
  Linking,
  Image,
  StyleSheet,
} from "react-native";
import DetailCard from "../Components/DetailCard";
import SettingCard from "../Components/SettingCard";
import Spacer from "../Components/Spacer";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackEnd from "../API/BackEnd";
import { Context as AuthContext } from "../Context/AuthContext";

const RideDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { rideId } = route.params;
  const [data, setData] = React.useState(null);

  const { state, updateState } = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log(
      "00------------------------------ Ride Details Screen ------------------------------00"
    );
    getInfo();
  }, [rideId]);

  const getInfo = async () => {
    const formData = new FormData();
    formData.append("rideId", rideId);
    formData.append("userId", state.userInfo.payload.id);
    const response = await BackEnd.post("/rideDetail", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setData(response.data);
    console.log(response.data);
  };

  const changeRideStatus = async () => {
    const formData = new FormData();
    formData.append("rideId", rideId);
    formData.append("userId", state.userInfo.payload.id);
    updateState(formData);
    navigation.navigate("Settings", { screen: "MyBookedRide" });
  };

  return data ? (
    <>
      <SettingCard
        buttonTitle="Book Ride"
        color={"green"}
        type="entypo"
        logo="bookmark"
        padding={0}
        onPress={() => changeRideStatus()}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={styles.background}
          />
          <Image
            uri={data.vehicleURL}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              margin: 20,
              resizeMode: "contain",
              backgroundColor: "#000",
            }}
          />
          <View>
            <Text style={styles.userInfoText}>
              {data.payload.userData.first_name}{" "}
              {data.payload.userData.last_name}
            </Text>
            <Text style={styles.userInfoText}>
              {data.payload.rideData.vehicletype}
            </Text>
            <Text style={styles.userInfoText}>{data.vehicleNumber}</Text>
          </View>
        </View>
        <Spacer />
        <Spacer />
        <Spacer>
          <DetailCard
            firstLabel="From"
            firstValue={data.payload.rideData.originName}
            secondLabel="To:"
            secondValue={data.payload.rideData.destinationName}
            firstLabelColor="green"
            secondLabelColor="red"
          />
        </Spacer>
        <Spacer bottomBorderWidth={1} />
        <Spacer>
          <DetailCard
            firstLabel=" Date"
            firstValue={data.payload.rideData.date}
          />
        </Spacer>
        <Spacer bottomBorderWidth={1} />
        <Spacer>
          <DetailCard
            firstLabel=" Time"
            firstValue={data.payload.rideData.time}
          />
        </Spacer>
        <Spacer bottomBorderWidth={1} />
        <Spacer>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${data.payload.userData.phoneNumber}`)
            }
          >
            <DetailCard
              firstLabel=" Contact"
              firstValue={data.payload.userData.phoneNumber}
              firstLabelColor={"green"}
            />
          </TouchableOpacity>
        </Spacer>
      </SettingCard>
    </>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  userInfoText: {
    fontWeight: "700",
    fontSize: 16,
    paddingVertical: 2,
    color: "#111",
    marginLeft: 15,
  },
});

export default RideDetailsScreen;
