import React, { useContext, useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { Alert, TouchableOpacity, View } from "react-native"; 

import Spacer from "../Components/Spacer";
import { Context as AuthContext } from "../Context/AuthContext";
import BackEnd from "../API/BackEnd";

const SignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const { state, signin, sendOTP, verifyOTP, clearOTPState } = useContext(AuthContext);

  React.useEffect(() => {
    return () => {
      clearOTPState();
    };
  }, [navigation]);

  async function signInWithPhoneNumber() {
    try {
      console.log("-------------- Checking Database ---------------");
      const response = await BackEnd.post("/checkNumber", { phoneNumber });
      console.log(response.data);
      setIsPhoneVerified(response.data.response);
      if (response.data.response) {
        console.log("----------------- Sending OTP -----------------");
        console.log(state);
        sendOTP({ phoneNumber: phoneNumber });
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Phone Number not found");
    }
  }

  const navigateToMainFlow = () => {
    try {
      console.log("----------------- Verifying OTP -----------------");
      verifyOTP({ phoneNumber: phoneNumber, otp: code });
      console.log(state);
      console.log("----------------- Signing In -----------------");
      signin({ phoneNumber: phoneNumber });
      console.log(state)
      console.log("----------------- Navigating -----------------");
      console.log(state);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Spacer>
        <View style={{ flexDirection: "row" }}>
          <Input
            keyboardType="numeric"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            leftIcon={{ type: "font-awesome", name: "phone" }}
          />
        </View>
        {isPhoneVerified && (
          <Input
            keyboardType="numeric"
            label="OTP"
            onChangeText={(text) => setCode(text)}
            leftIcon={{ type: "font-awesome", name: "key" }}
          />
        )}
        <Button
          onPress={
            state.OTPInfo !== null
              ? () => navigateToMainFlow()
              : () => signInWithPhoneNumber()
          }
          title={state.OTPInfo === null ? "Get OTP" : "Verify and Sign In"}
        />
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text>Don't have an account? Sign up here</Text>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

export default SignInScreen;

/**
 * <Input
        label="Phone Number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        leftIcon={{ type: "font-awesome", name: "phone" }}
      />
      {state.OTPInfo !== null && (
        <Input
          keyboardType="numeric"
          label="OTP"
          onChangeText={(text) => setOTP(text)}
          leftIcon={{ type: "font-awesome", name: "key" }}
        />
      )}
      <Button
        onPress={
          state.OTPInfo === null
            ? checkPhone
            : checkOTP
        }
        title={state.OTPInfo === null ? "Get OTP" : "Verify"}
      />
 */
