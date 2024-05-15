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
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const withdraw = ({ navigation }) => {
  const [amount, setAmount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amountErrorText, setAmountErrorText] = useState(false);
  const route = useRoute();
  var depositParamID = route.params.id;
  //👇️ when only pin is incorrect
  const showErrorText = () => {
    setAmountErrorText((current) => !current);
  };

  //👇️ modal state

  const [modalVisible, setModalVisible] = useState(false);

  //👇️ modal function hide and show

  const showModal = () => {
    setModalVisible((current) => !current);
    navigation.push("actions", {
      depositParamID: depositParamID,
    });
  };

  const handlerequest = () => {
    return fetch(
      `https://localhost:7027/api/account/withdraw?id=${route.params.id}&amount=${amount}`,
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
          showErrorText();
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
                <Text style={styles.modalText}>Withdraw successful!</Text>
                <Button
                  touchSoundDisabled
                  color="#0d1117"
                  title="Close"
                  onPress={showModal}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>
      <Text style={{ color: "black", fontSize: 20, top: -95, padding: 22 }}>
        You want to withdraw? Here is the right place to do it!
      </Text>
      <Image
        style={{ width: 150, height: 150, top: 13 }}
        source={require("../assets/istockphoto-929921700-170667a.jpg")}
      />
      <Text style={{ color: "black", fontSize: 20, top: -15, padding: 22 }}>
        Please enter the amount !
      </Text>
      <TextInput
        style={{
          top: -10,
          color: "black",
          fontSize: 20,
          borderBottomWidth: 1.75,
          borderColor: "white",
          width: -230,
          textAlign: "center",
          placeholderTextColor: "#0d1117",
        }}
        placeholder="Amount"
        onChangeText={(value) => setAmount(value)}
        // defaultValue={Number}
        secureTextEntry={false}
        keyboardType="numeric"
        maxLength={10000}
      />

      <SafeAreaView>
        {amountErrorText ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={amountErrorText}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setAmountErrorText(!amountErrorText);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Incorrect amount!</Text>
                <Button
                  touchSoundDisabled
                  color="#2196F3"
                  title="Close"
                  onPress={() => setAmountErrorText(!amountErrorText)}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>
      <View style={styles.hapsira}>
        <Button
          touchSoundDisabled
          color="#2196F3"
          title="Continue"
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

export default withdraw;
