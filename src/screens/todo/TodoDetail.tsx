import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TodoDetail = () => {
  return (
    <View style={styles.container}>
      <Text>TodoDetail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default TodoDetail;
