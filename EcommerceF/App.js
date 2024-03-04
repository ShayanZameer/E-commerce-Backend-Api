import React from "react";
import { View } from "react-native";

import Login from "./screens/Login";

import Signup from "./screens/Signup";
import ForgotPassword from "./screens/ForgotPassword";

import LinkingComponent from "./screens/LinkingComponent";
import ResetPassword from "./screens/ResetPassword";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GoogleMap from "./screens/GoogleMap";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <View className="flex-1 ">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GoogleMap">
          <Stack.Screen
            name="GoogleMap"
            component={GoogleMap}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LinkingComponent"
            component={LinkingComponent}
            // options={{ headerShown: false }}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
