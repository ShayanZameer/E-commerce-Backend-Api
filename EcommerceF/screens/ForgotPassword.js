import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../components/Input";
import Button from "../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    const userData = {
      email,
    };

    try {
      const response = await fetch(
        "http://192.168.100.4:5000/api/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log(" check your email for forgetting password ");

        setEmail("");
      } else {
        console.error("Signup failed. Server response:", responseData);
      }
    } catch (error) {
      console.error("Error during Forget password:", error);
    }
  };

  return (
    <>
      <View className="mb-3">
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
          translucent
        />
      </View>

      <View
        style={{ paddingTop: StatusBar.currentHeight }}
        className="flex-1 ml-3  bg-[#F9F9F9] "
      >
        {/* for left icon and name of Screen */}

        <View style={{ padding: 10 }}>
          {/* Left arrow icon */}
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          {/* Text "Signup" */}
          <Text className="ml-1 font-bold text-4xl mt-7">Forgot Password</Text>
        </View>

        <View className="mt-14 w-[340px] ml-5">
          <Text className="text-sm font-medium">
            Please, enter your email address. You will receive a link to create
            a new password via email.
          </Text>
        </View>

        <View className="mt-8 flex-col items-center">
          <View className="mt-5">
            <Input
              label="Email"
              placeholder="Enter your Email"
              isValid={true}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
        </View>

        {/* Button Component */}
        <View className="mt-14  ">
          <Button
            backgroundColor="#DB3022"
            width={343}
            textColor="white"
            onPress={handleSend}
          >
            Send
          </Button>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;
