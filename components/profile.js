import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Alert,
  View,
} from "react-native";

const profile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const route = useRoute();

  //👇️ clients here

  const [clientId, setClientId] = useState([]);
  const [clientUsername, setClientUsername] = useState([]);
  const [clientAddress, setClientAddress] = useState([]);
  const [clietPhone, setClientPhone] = useState([]);
  const [clientEmail, setClientEmail] = useState([]);

  //👇️ modal when show profile

  const [modalVisible, setModalVisible] = useState(false);

  var username = route.params.usernameValue;

  useEffect(() => {
    fetch(
      `https://localhost:7027/api/client/GetClientByUsername?username=${route.params.usernameValue}`
    )
      .then((response) => response.json())
      .then((json) => {
        setClientUsername(json[0].username);
        console.log("json", json);
        setClientId(json[0].client_id);
        setClientPhone(json[0].client_phone);
        setClientEmail(json[0].email);
        setClientAddress(json[0].address);
        console.log("respose", response);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      `https://localhost:7027/api/client/GetAccountsFromClients?username=${route.params.usernameValue}`
    )
      .then((response) => response.json())

      .then((json) => {
        setData(json);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.pinContainer}>
      <SafeAreaView>
        {/* Emblema */}

        <TouchableOpacity
          nextFocusForward={1}
          onPress={() => {
            navigation.push("login");
          }}
        >
          <Image
            style={{ top: -50, width: 335, height: 82 }}
            source={require("../assets/emblem.png")}
          />
        </TouchableOpacity>
      </SafeAreaView>


      <Button
        touchSoundDisabled
        color="#2196F3"
        title="Show Profile"
        onPress={() => setModalVisible(!modalVisible)}
      />
      <SafeAreaView>
        {modalVisible ? (
          <Modal
            animationType="fade"
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
                  Username:{" "}
                  <Text style={styles.modalText2}>{clientUsername}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Email: <Text style={styles.modalText2}>{clientEmail}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Phone: <Text style={styles.modalText2}>{clietPhone}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Address:{" "}
                  <Text style={styles.modalText2}>{clientAddress}</Text>
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

      <Text
        style={{
          color: "black",
          fontSize: 18,
          padding: 18,
          textAlign: "center",
        }}
      >
        If you want to make a transaction , please tap your desired account to
        proceed!
      </Text>

      <Text style={{ color: "black", fontSize: 25 }}>Accounts:</Text>

      <SafeAreaView>
        {loading ? (
          <ActivityIndicator />
        ) : (
          data.flatMap((account) => (
            <TouchableOpacity
              key={account.account_id}
              nextFocusForward={1}
              style={styles.list}
              onPress={() => {
                navigation.navigate("actions", {
                  key: account.account_id,
                  username: username,
                  account_name: account.account_name,
                });
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                {account.account_name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </SafeAreaView>

      <SafeAreaView style={styles.up}>
        <Button
          touchSoundDisabled
          color="#2196F3"
          title="Edit Profile"
          onPress={() => {
            navigation.navigate("editProfile", {
              username: clientUsername,
              email: clientEmail,
              address: clientAddress,
              phone: clietPhone,
              id: clientId,
            });
          }}
        />

        <SafeAreaView style={styles.left}>
          <Button
            touchSoundDisabled
            color="#2196F3"
            title="Change Pin"
            onPress={() => {
              navigation.navigate("changePin", {
                // id2: username,
                id: clientId,
              });
            }}
          />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

//style
const styles = StyleSheet.create({
  pinContainer: {
    flex: 1,
    // backgroundColor:'#212121',
    // backgroundColor: "#192a56",
    backgroundColor: "#A1A1A1",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  left: {
    left: 50,
    fontSize: 30,
  },

  up: {
    top: 20,
    fontSize: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    left: -20,
  },

  list: {
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 10,
    borderBottomEndRadius: 15,
    marginBottom: 5,
  },
  modalView: {
    margin: 20,
    width: -90,
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
    fontSize: 18,
    color: "#0d1117",
  },

  modalText2: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 19,
    color: "#5913f4",
  },

  errorMsg: {
    color: "#B00020",
  },
});

export default profile;
