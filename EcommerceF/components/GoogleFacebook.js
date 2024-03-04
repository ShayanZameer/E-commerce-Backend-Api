import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GoogleFacebook = ({ text }) => {
  return (
    <View className="items-center">
      <Text className="text-base my-3">or {text} with social account</Text>
      <View className="flex-row justify-around">
        <TouchableOpacity
          className="flex-row items-center justify-center
         bg-white  rounded-3xl h-16 w-24"
        >
          <Ionicons className="" name="logo-google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center
         bg-white  rounded-3xl h-16 w-24 ml-2"
        >
          <Ionicons name="logo-facebook" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleFacebook;
