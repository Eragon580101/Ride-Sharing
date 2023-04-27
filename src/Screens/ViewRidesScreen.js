import React from "react";
import { FlatList } from "react-native";
import ListCard from "../Components/ListCard";
import Spacer from "../Components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { Context as LocationContext } from "../Context/LocationContext";

import Data from "../Data";

const ViewRidesScreen = () => {

  const navigation = useNavigation();
  const { availableRides } = React.useContext(LocationContext);

  React.useEffect(() => {
    if (availableRides){
      console.log(availableRides.message);
      console.log(availableRides.payload)
    }
  }, [availableRides]);

  
  return (
    <>
      <FlatList
        data={Data}
        renderItem={({ item, index }) => (
          <>
            <ListCard
              title={item.Origin + " to " + item.Destination}
              date={item.Date}
              time={item.time}
              onPress={() =>
                navigation.navigate("CarRidesDetails", { rideTime: item.time })
              }
            />
            {index !== Data.length - 1 && <Spacer bottomBorderWidth={1} />}
          </>
        )}
      />
    </>
  );
};

export default ViewRidesScreen;
