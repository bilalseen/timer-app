import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../theme/colors";

const FloatingActionButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerContainer}>
        <MaterialIcons name="add" size={24} color={Colors.textPrimary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundNeutral,
  },
  innerContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accentPrimary,
  },
});

export default FloatingActionButton;
