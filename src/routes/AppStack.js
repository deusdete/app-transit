import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../pages/Login";
import RegisterScreen from "../pages/Register";


const Stack = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"  options={{headerShown: false}}  component={LoginScreen} />
        <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
