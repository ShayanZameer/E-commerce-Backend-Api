import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Button = ({ backgroundColor, width, textColor, onPress, children }) => {
  return (
    <View className="flex-col  items-center">
      <TouchableOpacity
        onPress={onPress}
        className="rounded-[25px] overflow-hidden"
        style={{ width: width }}
      >
        <View
          className="p-[12px] items-center h-[48px]"
          style={[{ backgroundColor: backgroundColor }]}
        >
          <Text style={{ color: textColor }}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
