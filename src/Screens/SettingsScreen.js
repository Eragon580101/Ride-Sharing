import React, { useContext } from "react";
import { Image, Text } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";

import ListCard from "../Components/ListCard";
import SettingCard from "../Components/SettingCard";
import Spacer from "../Components/Spacer";
import { Context as AuthContext } from "../Context/AuthContext";

const imageHeight = 100;
const cloudinaryUrl = "";

const SettingsScreen = ({ navigation }) => {
  const {
    state: { userInfo },
    signout,
  } = useContext(AuthContext);

  const { payload } = userInfo;

  console.log(
    "00------------------------------ Settings Screen ------------------------------00"
  );
  console.log(userInfo);

  return (
    payload && (
      <ScrollView>
        <StatusBar style="light" backgroundColor="#0e1b31" />
        <View style={styles.topSetting}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://res.cloudinary.com/dgeunftfh/${payload.user_profile}`,
              }}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.userInfoText}>
              {payload.first_name} {payload.last_name}
            </Text>
            <Text style={styles.userInfoText}>{payload.current_address}</Text>
            <Text style={styles.userInfoText}>{payload.phoneNumber}</Text>
          </View>
        </View>
        <SettingCard buttonTitle="Sign Out" onPress={signout}>
          <ListCard
            title={"My Ride History"}
            onPress={() => navigation.navigate("Ridehistory")}
          />
          <Spacer bottomBorderWidth={1} />
          <ListCard
            title={"My Booked Rides"}
            onPress={() => navigation.navigate("MyBookedRide")}
          />
          <Spacer bottomBorderWidth={1} />
          <ListCard
            title={"My Offered Rides"}
            onPress={() => navigation.navigate("MyOfferedRide")}
          />
          {payload.isRider && (
            <>
              <Spacer bottomBorderWidth={1} />
              <ListCard
                title={"Become a Rider"}
                onPress={() => navigation.navigate("BecomeRider")}
              />
            </>
          )}
        </SettingCard>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  image: {
    height: imageHeight,
    width: imageHeight,
    borderRadius: imageHeight / 2,
    alignSelf: "center",
  },
  imageContainer: {
    padding: 10,
    alignItems: "center",
  },
  userInfoText: {
    fontWeight: "700",
    fontSize: 16,
    paddingVertical: 2,
    color: "#fff",
    marginLeft: 15,
  },
  topSetting: {
    backgroundColor: "#0e1b31",
    height: 250,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SettingsScreen;
