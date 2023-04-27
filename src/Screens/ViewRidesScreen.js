import React from "react";
import { FlatList, View } from "react-native";
import ListCard from "../Components/ListCard";
import Spacer from "../Components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { Context as LocationContext } from "../Context/LocationContext";

import Data from "../Data";
import { Text } from "@rneui/themed";

const ViewRidesScreen = () => {
  const navigation = useNavigation();
  const {
    state: { availableRides },
  } = React.useContext(LocationContext);

  React.useEffect(() => {
    if (availableRides) {
      console.log(
        "00------------------------------ View Rides Screen ------------------------------00"
      );
      console.log(availableRides.message);
      console.log(availableRides.payload);
    }
  }, [availableRides]);

  return availableRides ? (
    availableRides.payload.length === 0 ? (
      <View>
        <Text>No Rides Available</Text>
      </View>
    ) : (
      <>
        <FlatList
          data={availableRides.payload}
          keyExtractor={(item) => item.rideId}
          renderItem={({ item, index }) => (
            <>
              <ListCard
                title={item.originName + " to " + item.destinationName}
                date={item.date}
                time={item.time}
                onPress={() =>
                  navigation.navigate("CarRidesDetails", {
                    rideId: item.rideId,
                  })
                }
              />
              {index !== Data.length - 1 && <Spacer bottomBorderWidth={1} />}
            </>
          )}
        />
      </>
    )
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default ViewRidesScreen;
