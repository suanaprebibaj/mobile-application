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
  Touchable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import login from "./login";
import { TouchableOpacity } from "react-native-gesture-handler";

const editProfile = ({ navigation }) => {
  //👇️ const [data, setData] = useState([]);

  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(route.params.phone);
  const [address, setAdd] = useState(route.params.address);
  const [usernameValue, setUsername] = useState(route.params.username);
  const [email, setEmail] = useState(route.params.email);

  //👇️ modal state

  const [modalVisible, setModalVisible] = useState(false);
  const [errormodalVisible, seterrorModalVisible] = useState(false);

  //👇️ modal function hide and show
  const showModal = () => {
    setModalVisible((current) => !current);
  };
  const showErrorModal = () => {
    seterrorModalVisible((current) => !current);
  };

  //👇️ main function
  const handlerequest = () => {
    if (usernameValue == null) {
      return showErrorModal();
    }

    return fetch(
      `https://localhost:7027/api/client/editProfile?id=${route.params.id}&username=${usernameValue}&address=${address}&phone=${phone}&email=${email}`,
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
          // navigation.navigate("login");
        } else {
          console.log(response);
          showErrorModal();
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.pinContainer}>
      <TouchableOpacity
        nextFocusForward={1}
        onPress={() => {
          navigation.push("login");
        }}
      >
        <Image
          style={{ top: 10, width: 335, height: 82 }}
          source={require("../assets/emblem.png")}
        />
      </TouchableOpacity>
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
                  Profile edited successfully!
                </Text>
                <Button
                  touchSoundDisabled
                  color="#0d1117"
                  title="Close"
                  onPress={() => navigation.navigate("login")}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>

      <SafeAreaView>
        {errormodalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={errormodalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              seterrorModalVisible(!errormodalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Error occoured , profile did not edited
                </Text>
                <Button
                  touchSoundDisabled
                  color="#0d1117"
                  title="Close"
                  onPress={() => seterrorModalVisible(!errormodalVisible)}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>

      <SafeAreaView>
        <Text style={styles.text1}>Please enter your new username !</Text>
        <TextInput
          style={styles.pininput}
          placeholder="username"
          placeholderTextColor="black"
          defaultValue={route.params.username}
          onChangeText={(value) => setUsername(value)}
        />
        <Text style={styles.text1}>Please enter your new address!</Text>
        <TextInput
          style={styles.pininput}
          placeholder="address"
          placeholderTextColor="black"
          defaultValue={route.params.address}
          onChangeText={(value) => setAdd(value)}
        />
        <Text style={styles.text1}>Please enter your new phone!</Text>
        <TextInput
          style={styles.pininput}
          placeholder="phone"
          placeholderTextColor="black"
          defaultValue={route.params.phone}
          onChangeText={(value) => setPhone(value)}
        />

        <Text style={styles.text1}>Please enter your new email !</Text>
        <TextInput
          style={styles.pininput}
          placeholder="email"
          placeholderTextColor="black"
          defaultValue={route.params.email}
          onChangeText={(value) => setEmail(value)}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.hapsira}>
        <Button
          touchSoundDisabled
          color="#2196F3"
          title="Update Profile"
          onPress={handlerequest}
        />
      </SafeAreaView>
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

export default editProfile;
