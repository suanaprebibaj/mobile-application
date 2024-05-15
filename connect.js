import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

// get data from this URL!
const atmURL = "https://localhost:7027/api/client/";

var request = new XMLHttpRequest();
request.onreadystatechange = () => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};

const sendRequest = () => {
  request.open('GET', atmURL);
  request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:19006')
  request.send();
  return;
}

const connect = () => {
  return (
    <SafeAreaView>
            <TouchableOpacity
          nextFocusForward={ 1}
           style={styles.container}
            onPress={sendRequest} 
            >
        <Text>Response</Text>
              </TouchableOpacity> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  movieText: {
    fontSize: 26,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
});

export default connect;