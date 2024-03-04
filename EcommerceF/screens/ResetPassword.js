import { View, Text } from "react-native";
import React from "react";

import { useRoute } from "@react-navigation/native";

const ResetPassword = () => {
  const route = useRoute();
  const { token } = route.params;

  console.log("ResetPassword rendered");
  console.log("Token:", token);
  return (
    <View>
      <Text>ResetPassword</Text>
    </View>
  );
};

export default ResetPassword;
