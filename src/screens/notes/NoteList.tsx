import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { useFonts } from "expo-font";
import Colors from "../../theme/colors";
import CategoryList from "../../components/CategoryList";
import NoteCard from "../../components/NoteCard";
import FloatingActionButton from "../../components/FloatingActionButton";

const NoteList = () => {
  const [loaded, error] = useFonts({
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
  });

  const notesExample = [
    {
      id: 1,
      title: "Todo List",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc.",
      date: "2021-09-01",
    },
    {
      id: 2,
      title: "Shopping List",
      content: "1. Apples\n2. Bananas\n3. Oranges\n4. Milk",
      date: "2021-09-02",
    },
    {
      id: 3,
      title: "Recipe",
      content: "1. 2 cups of flour\n2. 1 cup of sugar\n3. 3 eggs",
      date: "2021-09-03",
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <Header />
      <CategoryList />
      <FlatList
        data={notesExample}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteCard
            title={item.title}
            content={item.content}
            date={item.date}
          />
        )}
      />
      <FloatingActionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal: 10,
  },
});

export default NoteList;
