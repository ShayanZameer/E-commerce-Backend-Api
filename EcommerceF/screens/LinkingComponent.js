// LinkingComponent.js
import React, { useEffect } from "react";
import { Linking } from "expo";
import { useNavigation } from "@react-navigation/native";

const LinkingComponent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      console.log("Received deep link:", url);

      if (url) {
        const tokenIndex = url.indexOf("token=");
        if (tokenIndex !== -1) {
          const token = url.substring(tokenIndex + 6);
          console.log("Extracted token:", token);
          navigation.navigate("ResetPassword", { token });
        }
      }
    };

    handleDeepLink();

    Linking.addEventListener("url", handleDeepLink);

    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, [navigation]);

  return null;
};

export default LinkingComponent;
