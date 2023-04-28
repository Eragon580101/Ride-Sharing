import React from "react";
import { Button, Input } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import { Context as AuthContext } from "../Context/AuthContext";
import Spacer from "../Components/Spacer";
import ImagePicker from "../Components/ImagePicker";
import Dropdown from "react-native-input-select";

const DriverSignUp = () => {
  const [licenseNumber, setLicenseNumber] = React.useState("");
  const [citizenshipNumber, setCitizenshipNumber] = React.useState("");
  const [vehicleRegistrationNumber, setVehicelRegistrationNumber] =
    React.useState("");

  const [NextPage, setNextPage] = React.useState(false);

  const [vehicleImage, setVehicleImage] = React.useState(null);
  const [licensePhoto, setLicensePhoto] = React.useState(null);
  const [billBookPage3, setBillBookPage3] = React.useState(null);
  const [billBookPage2, setBillBookPage2] = React.useState(null);
  const [billBookPage9, setBillBookPage9] = React.useState(null);
  const [transportYears, setTransportYears] = React.useState(0);

  const [citizenshipImageFront, setCitizenshipImageFront] =
    React.useState(null);
  const [citizenshipImageBack, setCitizenshipImageBack] = React.useState(null);
  const [idConfirmationImage, setIdConfirmationImage] = React.useState(null);


  //DRop down
  const [vehicleType, setVehicleType] = React.useState("Nepal");

  const { state, sendRiderInfo, sendVehicleInfo } =
    React.useContext(AuthContext);

  const addRider = () => {
    const RiderInfo = new FormData();
    RiderInfo.append("citizenshipNumber", citizenshipNumber);
    RiderInfo.append("citizenshipImageFront", {
      uri: citizenshipImageFront,
      name: "citizenshipImageFront.jpg",
      type: "image/jpeg",
    });
    RiderInfo.append("citizenshipImageBack", {
      uri: citizenshipImageBack,
      name: "citizenshipImageBack.jpg",
      type: "image/jpeg",
    });
    RiderInfo.append("idConfirmationImage", {
      uri: idConfirmationImage,
      name: "idConfirmationImage.jpg",
      type: "image/jpeg",
    });
    RiderInfo.append("userId", state.userInfo.payload.id);
    console.log(
      "----------------------- RiderInfo ----------------------------------"
    );
    console.log(RiderInfo);
    sendRiderInfo(RiderInfo);
  };

  const addVehicle = () => {
    const vehicleInfo = new FormData();
    vehicleInfo.append("licenseNumber", licenseNumber);
    vehicleInfo.append("vehicleRegistrationNumber", vehicleRegistrationNumber);
    vehicleInfo.append("vehicleImage", {
      uri: vehicleImage,
      name: "vehicleImage.jpg",
      type: "image/jpeg",
    });
    vehicleInfo.append("billBookPage2", {
      uri: billBookPage2,
      name: "billBookPage2.jpg",
      type: "image/jpg",
    });
    vehicleInfo.append("billBookPage3", {
      uri: billBookPage3,
      name: "billBookPage3.jpg",
      type: "image/jpeg",
    });
    vehicleInfo.append("billBookPage9", {
      uri: billBookPage9,
      name: "billBookPage9.jpg",
      type: "image/jpeg",
    });
    vehicleInfo.append("licensePhoto", {
      uri: licensePhoto,
      name: "licensePhoto.jpg",
      type: "image/jpeg",
    });
    vehicleInfo.append("transportYears", transportYears);
    vehicleInfo.append("userId", state.userInfo.payload.id);
    vehicleInfo.append("vehicleType", vehicleType);
    console.log(
      "----------------------- vehicleInfo ----------------------------------"
    );
    console.log(vehicleInfo);
    sendVehicleInfo(vehicleInfo);
  };

  const addToDatabase = async () => {
    addRider();
    addVehicle();
    () => navigation.navigate("SettingsScreen");
  };

  if (NextPage) {
    return (
      <ScrollView>
        <Spacer>
          <Input
            label="Vehicle Registration Number"
            value={vehicleRegistrationNumber}
            onChangeText={(text) => {
              setVehicelRegistrationNumber(text);
            }}
            leftIcon={{ type: "font-awesome", name: "hashtag" }}
          />
          <Input
            label="Transport Year"
            value={transportYears}
            onChangeText={(text) => {
              setTransportYears(text);
            }}
            leftIcon={{ type: "font-awesome", name: "calendar" }}
          />

          <Dropdown
            label="Select a Vehicle Type"
            labelStyle={{ fontWeight: "bold", marginLeft: 10, fontSize: 15}}
            placeholder="Select an option..."
            options={[
              { name: "Bike", code: "Bike" },
              { name: "Car", code: "Car" },
            ]}
            optionLabel={"name"}
            optionValue={"code"}
            selectedValue={vehicleType}
            onValueChange={(value) => setVehicleType(value)}
            primaryColor={"green"}
            dropdownStyle={{ borderWidth: 1, borderColor: "#00000052", padding: 1, height: 40, width: 320, marginHorizontal: 10 }}
          />
          <ImagePicker
            image={licensePhoto}
            setImage={setLicensePhoto}
            title="License Photo"
          />

          <ImagePicker
            image={billBookPage2}
            setImage={setBillBookPage2}
            title="Billbook page 2"
          />

          <ImagePicker
            image={billBookPage3}
            setImage={setBillBookPage3}
            title="Billbook page 3"
          />

          <ImagePicker
            image={billBookPage9}
            setImage={setBillBookPage9}
            title="Billbook page 9"
          />

          <ImagePicker
            image={vehicleImage}
            setImage={setVehicleImage}
            title="Vehicle Image"
          />
          <Spacer />
          <Spacer />
          <Button
            title="Submit"
            onPress={() => addToDatabase()}
            color="#4AA96C"
          />
          <View style={{ marginVertical: 2 }} />
          <Button
            title="Previous"
            onPress={() => setNextPage(false)}
            color="#454f4f"
          />
        </Spacer>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Spacer>
        <Input
          label="License Number"
          value={licenseNumber}
          onChangeText={(text) => {
            setLicenseNumber(text);
          }}
          leftIcon={{ type: "font-awesome", name: "hashtag" }}
        />
        <Input
          label="Citizenship Number"
          value={citizenshipNumber}
          onChangeText={(text) => {
            setCitizenshipNumber(text);
          }}
          leftIcon={{ type: "font-awesome", name: "hashtag" }}
        />

        <ImagePicker
          image={citizenshipImageFront}
          setImage={setCitizenshipImageFront}
          title="Citizenship Front Image"
        />

        <ImagePicker
          image={citizenshipImageBack}
          setImage={setCitizenshipImageBack}
          title="Citizenship Back Image"
        />

        <ImagePicker
          image={idConfirmationImage}
          setImage={setIdConfirmationImage}
          title="ID Confirmation Photo"
        />
        <Spacer />
        <Button
          title="Next"
          onPress={() => setNextPage(true)}
          color="#454f4f"
        ></Button>
      </Spacer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInputTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: "#444",
    fontSize: 18,
  },
  textError: {
    fontSize: 12,
    padding: 10,
    color: "red",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default DriverSignUp;
