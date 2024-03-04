import React, { useState } from "react";

import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import GoogleFacebook from "../components/GoogleFacebook";
const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://192.168.100.4:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Login successful, you can navigate to another screen or perform additional actions
        console.log("Login successfully Done");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
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
          <Text className="ml-1 font-bold text-4xl mt-7">Login</Text>
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

          <View className="mt-5">
            <Input
              label="Password"
              placeholder="Enter Password"
              isValid={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </View>

        {/* Forgot password and arrow  */}

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <View className="flex-row items-center justify-end p-3 mt-5">
            {/* Label text */}
            <Text className="mr-2">Forgot Password</Text>
            {/* Arrow forward icon */}
            <FontAwesome name="long-arrow-right" size={24} color="#DB3022" />
          </View>
        </TouchableOpacity>

        {/* Button Component */}
        <View className="mt-5  ">
          <Button
            backgroundColor="#DB3022"
            width={343}
            textColor="white"
            onPress={handleLogin}
          >
            Login
          </Button>
        </View>

        {/* Google Facebook Component */}

        <View className="flex-col mt-14">
          <GoogleFacebook text="login" />
        </View>
      </View>
    </>
  );
};

export default Login;
