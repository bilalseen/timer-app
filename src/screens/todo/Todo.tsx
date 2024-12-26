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
      <Text style={styles.firstTitleText}>Your're doing great,</Text>
      <Text style={styles.secondTitleText}>your're halfway there!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: todoColors.background,
  },
  firstTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: todoColors.textPrimary,
  },
  secondTitleText: {
    fontSize: 24,
    color: todoColors.textPrimary,
  },
});

export default Todo;
