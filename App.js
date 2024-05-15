import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import login from "./components/login";
import profile from "./components/profile";
import withdraw from "./components/withdraw";
import deposit from "./components/deposit";
import language from "./components/language";
import actions from "./components/actions";
import transaction from "./components/transaction";
import send from "./components/send";
import connect from "./connect";
import changePin from "./components/changePin";
import editProfile from "./components/editProfile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="profile" component={profile} />
        <Stack.Screen name="withdraw" component={withdraw} />

        <Stack.Screen name="deposit" component={deposit} />
        <Stack.Screen name="language" component={language} />
        <Stack.Screen name="actions" component={actions} />
        <Stack.Screen name="transaction" component={transaction} />
        <Stack.Screen name="send" component={send} />

        <Stack.Screen name="connect" component={connect} />
        <Stack.Screen name="editProfile" component={editProfile} />
        <Stack.Screen name="changePin" component={changePin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192a56",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
