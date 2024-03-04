import React from "react";
import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../res/colors";

const Input = ({ label, placeholder, isValid, value, onChangeText }) => {
  return (
    <View className="bg-white h-16 w-[350px] flex-col justify-center rounded-xl ">
      <Text style={{ color: colors.lightGrey }} className="ml-5  ">
        {label}
      </Text>
      <View className="flex-row items-center ">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className=" ml-5  flex-1"
          placeholder={placeholder}
        />
        {isValid ? (
          <Ionicons
            style={{ marginRight: 10 }}
            name="checkmark"
            size={24}
            color="green"
          />
        ) : (
          <Ionicons name="close" size={24} color="red" />
        )}
      </View>
    </View>
  );
};

export default Input;
