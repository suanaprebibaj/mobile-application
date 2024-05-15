import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  Modal,
  Alert,
} from "react-native";

const login = ({ navigation }) => {
  const [pinValue, setPin] = useState(null);
  const [usernameValue, setUsername] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [usernameErrorText, setUsernameErrorText] = useState([]);
  const [pinErrorText, setPinErrorText] = useState(false);
  const [hiddenUsernameError, setHiddenUsernameError] = useState(false);

  //👇️ when both username and password are incorrect
  const showTextBoth = () => {
    setHiddenUsernameError((current) => !current);
    setPinErrorText((current) => !current);
  };

  //👇️ when only username is incorrect
  const showTextUsernameOnly = () => {
    setPinErrorText((current) => !current);
  };

  //👇️ when only pin is incorrect
  const showTextPinOnly = () => {
    setPinErrorText((current) => !current);
  };

  //👇️ modal when not loggin in
  const showModal = () => {
    setModalVisible((current) => !current);
  };

  //👇️main function
  const handlerequest = () => {
    if (pinValue == null && usernameValue == null) {
      return showTextBoth();
    } else if (usernameValue == null && pinValue != null) {
      return showTextUsernameOnly();
    } else if (pinValue == null && usernameValue != null) {
      return showTextPinOnly();
    }

    return fetch(
      `https://localhost:7027/api/client/login?pin=${pinValue}&username=${usernameValue}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          console.log(response.json());

          navigation.navigate("profile", {
            usernameValue: usernameValue,
          });
        } else {
          console.log("Error");
          showModal();
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   if (route.params.key == null) {
  //     route.params.key = route.params.depositParamID;
  //   }
  //   fetch(`https://localhost:7027/api/account/${route.params.key}`)
  //     .then((response) => response.json()) // get response, convert to json
  //     .then((json) => {
  //       setcurrency(json.currency);
  //       setACCName(json.account_name);
  //       setbalance(json.balance);
  //       setAccID(json.account_id);
  //     })
  //     .catch((error) => alert(error)) // display errors
  //     .finally(() => setLoading(false)); // change loading state
  // }, []);

  return (
    <SafeAreaView style={styles.pinContainer}>
      <Image
        style={{ top: -50, width: 335, height: 82 }}
        source={require("../assets/emblem.png")}
      />

      <SafeAreaView>
        {modalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Username or pin not correct!
                </Text>
                <Button
                  touchSoundDisabled
                  color="#0d1117"
                  title="Close"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>
      <Text style={styles.text1}>Fill in your username & password !</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        placeholderTextColor="#0d1117"
        onChangeText={(value) => setUsername(value)}
      // value={username}
      />

      {hiddenUsernameError ? (
        <Text style={styles.errorMsg}>Username is empty</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000000"
        onChangeText={(value) => setPin(value)}
        // value={pin}
        defaultValue={Number}
        secureTextEntry={true}
        password={true}
        keyboardType="numeric"
        maxLength={4}
      />
      {pinErrorText ? <Text style={styles.errorMsg}>Password is empty</Text> : null}
      {/* <text>{pinErrorText}</text> */}
      <View style={styles.hapsira}>
        <Button
          touchSoundDisabled
          color="#2196F3"
          title="Login"
          onPress={handlerequest}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pinContainer: {
    flex: 1,
    backgroundColor: "#A1A1A1",

    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  hapsira: {
    top: 20,
  },

  text1: {
    color: "#2196F3",
    fontSize: 20,
    top: -15,
    padding: 8,
  },

  input: {
    height: 40,
    top: -10,
    color: "#c9d1d9",
    fontSize: 20,
    borderBottomWidth: 1.75,

    borderColor: "#c9d1d9",
    margin: 15,
    textAlign: "center",
    textDecorationLine: "none",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#c9d1d9",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  errorMsg: {
    color: "#B00020",
  },
});

export default login;
