import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const language = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.pinContainer}>
      {/* <Image style={styles.bgimage} source={require('../assets/7517aa1a73ce68b7c48bf0bbd4953dc8.jpg')}/> */}

      {/* Emblema */}
      <Image style={{ top: -200 }} source={require("../assets/emblem.png")} />

      <>
        <Text style={{ color: "white", fontSize: 30, top: -100 }}>
          Choose the language:{" "}
        </Text>

        <SafeAreaView style={styles.bothbuttons}>
          <SafeAreaView style={styles.up}>
            <Button
              touchSoundDisabled
              color="grey"
              title="English"
              onPress={() => {
                navigation.navigate("login");
              }}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.left}>
            <Button
              touchSoundDisabled
              color="grey"
              title="Shqip"
              onPress={() => {
                navigation.navigate("login");
              }}
            />
          </SafeAreaView>
        </SafeAreaView>
      </>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pinContainer: {
    flex: 1,
    backgroundColor: "#192a56",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  left: {
    left: 50,
    fontSize: 30,
    height: 100,
    marginTop: 10,
  },

  up: {
    right: 50,
    fontSize: 30,
    height: 100,
    marginTop: 10,
  },
  bgimage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  bothbuttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default language;
