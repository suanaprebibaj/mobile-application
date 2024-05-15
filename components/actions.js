import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

const actions = ({ navigation }) => {
  const [currency, setcurrency] = useState([]);
  const [accName, setACCName] = useState([]);
  const [balance, setbalance] = useState([]);
  const [accID, setAccID] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  var username = route.params.username;
  var accountName = route.params.account_name;
  useEffect(() => {
    if (route.params.key == null) {
      route.params.key = route.params.depositParamID;
    }
    fetch(`https://localhost:7027/api/account/${route.params.key}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setcurrency(json.currency);
        setACCName(json.account_name);
        setbalance(json.balance);
        setAccID(json.account_id);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
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

      {loading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.welcome}>
          <Text style={{ color: "black", fontSize: 30, top: -300 }}>
            Account:{" "}
            <Text style={{ color: "#ffbf00", fontSize: 30, top: -200 }}>
              {accName}!
            </Text>
          </Text>
        </SafeAreaView>
      )}
      {/* Balanca */}

      <SafeAreaView style={styles.balance}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text>
            <Text style={{ color: "black", fontSize: 22, top: 12 }}>
              Balance :{" "}
              <Text style={{ color: "#2196F3", fontSize: 30 }}>
                {currency} {balance}
              </Text>
            </Text>
          </Text>
        )}
      </SafeAreaView>

      <Text style={{ color: "black", fontSize: 20 }}>
        Choose one of the options below:
      </Text>

      <SafeAreaView style={styles.up}>
        <TouchableOpacity
          nextFocusForward={1}
          style={styles.list}
          onPress={() => {
            navigation.navigate("withdraw", {
              id: accID,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          nextFocusForward={1}
          style={styles.list}
          onPress={() => {
            navigation.navigate("deposit", {
              id3: accID,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          nextFocusForward={1}
          style={styles.list}
          onPress={() => {
            navigation.navigate("send", {
              id3: accID,
              username: username,
              accountName: accountName,
              balance: balance,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          nextFocusForward={1}
          style={styles.list}
          onPress={() => {
            navigation.navigate("transaction", {
              id: accID,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Transactions History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          nextFocusForward={1}
          style={styles.list}
          onPress={() => {
            navigation.navigate("profile", {
              usernameValue: username,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Go back to profile
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  left: {
    left: 50,
    fontSize: 30,
  },

  up: {
    top: 20,
  },
  down: {
    fontSize: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 60,
  },
  left2: {
    left: 50,
    fontSize: 30,
  },
  list: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderBottomEndRadius: 15,
    marginBottom: 5,
  },

  balance: {
    // left: -60,
    top: -40,
  },
  welcome: {
    top: -50,
  },
});

export default actions;
