import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useFonts } from "expo-font";
import Colors from "../../theme/colors";
import CategoryList from "../../components/CategoryList";
import NoteCard from "../../components/NoteCard";
import FloatingActionButton from "../../components/FloatingActionButton";
import AddNoteModal from "../../components/Modals/AddNoteModal";

import { useSelector } from "react-redux";
import { selectActiveCategories, selectNotes } from "../../redux/notesSlice";
import parseNoteData from "../../utils/parseNoteData";

interface Note {
  id: string;
  title: string;
  content: string;
  categories: string[];
  lastCategories: string[];
  date: string;
  isEdited: boolean;
}

const NoteList = () => {
  const [loaded, error] = useFonts({
    "Satoshi-Light": require("../../assets/fonts/Satoshi-Light.otf"),
    "Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Italic": require("../../assets/fonts/Satoshi-Italic.otf"),
  });

  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const notes = useSelector(selectNotes);
  const activeCategories = useSelector(selectActiveCategories);

  const toggleAddModal = () => {
    setAddNoteModalVisible(!addNoteModalVisible);
  };

  useEffect(() => {
    if (searchText !== "") {
      const filtered = notes.filter((note) => {
        return (
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredNotes(parseNoteData(filtered));
    } else {
      if (activeCategories.length === 0) {
        setFilteredNotes(parseNoteData(notes));
      } else {
        const filtered = notes.filter((note) => {
          return activeCategories.some((category) =>
            note.categories.includes(category)
          );
        });
        setFilteredNotes(parseNoteData(filtered));
      }
    }
  }, [activeCategories, notes, searchText]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      {!isSearchOpen && <CategoryList />}
      {notes.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredNotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NoteCard item={item} />}
          ListFooterComponent={() => <View style={{ height: 70 }} />}
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
    gap: 10,
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
