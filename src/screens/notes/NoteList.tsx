import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useFonts } from "expo-font";
import Colors from "../../theme/colors";
import CategoryList from "../../components/CategoryList";
import NoteCard from "../../components/NoteCard";
import FloatingActionButton from "../../components/FloatingActionButton";
import AddNoteModal from "../../components/Modals/AddNoteModal";

import { useSelector, useDispatch } from "react-redux";
import { selectNotes } from "../../redux/notesSlice";

const NoteList = () => {
  const [loaded, error] = useFonts({
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
  });

  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);

  const toggleAddModal = () => {
    setAddNoteModalVisible(!addNoteModalVisible);
  };

  const notes = useSelector(selectNotes);
  useEffect(() => {
    console.log(notes);
  }, [notes]);

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
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <NoteCard
              title={item.title}
              content={item.content}
              date={item.date}
            />
          )}
        />
      ) : (
        <View style={styles.noneNotesTextContainer}>
          <Text style={styles.noneNotesText}>Let's add some notes!</Text>
        </View>
      )}
      <AddNoteModal
        addNoteModalVisible={addNoteModalVisible}
        toggleAddModal={toggleAddModal}
      />
      <FloatingActionButton toggleAddModal={toggleAddModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  noneNotesTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noneNotesText: {
    textAlign: "center",
    color: Colors.textSecondary,
    fontFamily: "Satoshi-Regular",
  },
});

export default NoteList;
