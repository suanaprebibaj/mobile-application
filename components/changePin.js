import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  Modal,
  Alert,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const changePin = ({ navigation }) => {
  const [pinValue, setPin] = useState(null);
  const [pinValue2, resetPin] = useState(null);
  const route = useRoute();
  const [pinErrorText, setPinErrorText] = useState(false);
  const [pinExist, setPinExist] = useState(false);

  //👇️ when only pin is incorrect
  const showTextPinOnly = () => {
    setPinErrorText((current) => !current);
  };
  const thisPinExist = () => {
    setPinExist((current) => !current);
  };

  //👇️ modal state

  const [modalVisible, setModalVisible] = useState(false);

  //👇️ modal function hide and show

  const showModal = () => {
    setModalVisible((current) => !current);
  };

  const handlerequest = () => {
    if (pinValue != pinValue2) {
      return showTextPinOnly();
    }

    return fetch(
      `https://localhost:7027/api/client/changePin?id=${route.params.id}&pin1=${pinValue}&pin2=${pinValue2}`,
      {
        method: "PUT",
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
          showModal();
        } else {
          console.log(response);
          thisPinExist();
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

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
                <Text style={styles.modalText}>Pin edited successfully</Text>
                <Button
                  touchSoundDisabled
                  color="#2196F3"
                  title="Close"
                  onPress={() => navigation.navigate("login")}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>

      <SafeAreaView>
        <Text style={styles.text1}>Please enter your new pin !</Text>
        <TextInput
          style={styles.pininput}
          placeholder="new pin"
          placeholderTextColor="#0d1117"
          onChangeText={(value) => setPin(value)}
          // defaultValue={Number}
          secureTextEntry={true}
          password={true}
          keyboardType="numeric"
          maxLength={4}
        />

        <Text style={styles.text1}>Please re-enter your new pin !</Text>
        <TextInput
          style={styles.pininput}
          placeholder="re-enter pin"
          placeholderTextColor="#0d1117"
          onChangeText={(value) => resetPin(value)}
          // defaultValue={Number}
          secureTextEntry={true}
          password={true}
          keyboardType="numeric"
          maxLength={4}
        />
      </SafeAreaView>
      <SafeAreaView>
        {pinErrorText ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={pinErrorText}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setPinErrorText(!pinErrorText);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Pin doesn't match!</Text>
                <Button
                  touchSoundDisabled
                  color="#0d1117"
                  title="Close"
                  onPress={() => setPinErrorText(!pinErrorText)}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>

      <SafeAreaView>
        {pinExist ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={pinExist}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setPinExist(!pinExist);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Pin doesn't match!</Text>
                <Button
                  touchSoundDisabled
                  color="#0d1117"
                  title="Close"
                  onPress={() => setPinExist(!pinExist)}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>
      <Button color="#2196F3" title="Change pin" onPress={handlerequest} />
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
    color: "black",
    fontSize: 22,
    top: -15,
    marginTop: 20,
  },

  pininput: {
    height: 40,
    top: -10,
    color: "white",
    fontSize: 20,
    borderBottomWidth: 1.75,
    borderColor: "white",
    margin: 14,
    textAlign: "center",
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

export default changePin;
