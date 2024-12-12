import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { useFonts } from "expo-font";
import Colors from "../../theme/colors";
import CategoryList from "../../components/CategoryList";

const NoteList = () => {
  const [loaded, error] = useFonts({
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <Header />
      <CategoryList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
});

export default NoteList;
