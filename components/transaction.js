import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";

const transaction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  // const [accID, setAccID] = useState([]);
  // var username = route.params.username;
  useEffect(() => {
    fetch(
      `https://localhost:7027/api/account/GetTransFromAcc?id=${route.params.id}`
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

      <Text style={{ color: "white", fontSize: 25 }}>History:</Text>

      <SafeAreaView>
        <ScrollView style={styles.scrrollstyle}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            data.flatMap((account) => (
              <TouchableOpacity
                key={account.transaction_id}
                nextFocusForward={1}
                style={styles.list}
                onPress={() => {
                  navigation.navigate("", {
                    key: account.account_id,
                  });
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  {account.transaction_type} , Amount: {account.amount}{" "}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

//style
const styles = StyleSheet.create({
  pinContainer: {
    flex: 1,
    // backgroundColor:'#212121',
    backgroundColor: "#A1A1A1",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
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
    backgroundColor: "black",
    padding: 10,
    borderBottomEndRadius: 15,
    marginBottom: 5,
  },

  scrrollstyle: {
    paddingVertical: 20,
    flex: 1,
  },
});

export default transaction;
