import React from "react";
import { useState } from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import GoogleFacebook from "../components/GoogleFacebook";
import Input from "../components/Input";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://192.168.100.4:5000/api/auth/signUp",
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
        console.log("User has been added to database ");

        setName("");
        setPassword("");
        setEmail("");
      } else {
        console.error("Signup failed. Server response:", responseData);
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
          <Text className="ml-1 font-bold text-4xl mt-7" style={{}}>
            Signup
          </Text>
        </View>

        {/* Input Component  */}

        <View className="mt-8 flex-col items-center">
          <View className="mt-5">
            <Input
              label="Name"
              placeholder="Enter your name"
              isValid={true}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View className="mt-5">
            <Input
              label="Email"
              placeholder="Enter Email"
              isValid={true}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View className="mt-5">
            <Input
              label="Password"
              placeholder="Enter Password "
              isValid={false}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        {/* Already have an account and arrow  */}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View className="flex-row items-center justify-end p-3 mt-5">
            {/* Label text */}
            <Text className="mr-2">Already have an account</Text>
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
            onPress={handleSignup}
          >
            Sign Up
          </Button>
        </View>

        {/* Google Facebook Component */}

        <View className="flex-col mt-14">
          <GoogleFacebook text="signup" />
        </View>
      </View>
    </>
  );
};

export default Signup;
