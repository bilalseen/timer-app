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
    "Satoshi-Light": require("../../assets/fonts/Satoshi-Light.otf"),
    "Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Italic": require("../../assets/fonts/Satoshi-Italic.otf"),
  });

  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);

  const toggleAddModal = () => {
    setAddNoteModalVisible(!addNoteModalVisible);
  };

  const notes = useSelector(selectNotes);
  useEffect(() => {
    // console.log(notes);
  }, [notes]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <Header />
      <CategoryList />
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NoteCard item={item} />}
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
