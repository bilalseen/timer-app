import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import todoColors from "../../theme/todo/colors";

const Todo = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={todoColors.background}
      />
      <Text style={{ color: "#fff" }}>Hola Todo's</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: todoColors.background,
  },
});

export default Todo;
