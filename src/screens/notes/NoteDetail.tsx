import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../theme/colors";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../redux/notesSlice";
import EditNoteModal from "../../components/Modals/EditNoteModal";
import DeleteNoteModal from "../../components/Modals/DeleteNoteModal";
import CategoryCard from "../../components/CategoryCard";
import { nanoid } from "@reduxjs/toolkit";
import ToastMessage from "../../feedback/ToastMessage";

type RouteParams = {
  params: {
    itemId: string;
    openModal: boolean;
  };
};

interface NoteProps {
  id: string;
  title: string;
  content: string;
  date: string;
  categories?: string[];
}

const NoteDetail = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const { itemId, openModal } = route.params;

  useEffect(() => {
    openModal && setEditModalVisible(true);
  }, [openModal]);

  const note = useSelector((state: { notes: { notes: NoteProps[] } }) =>
    state.notes.notes.find((note) => note.id === itemId)
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteNote = () => {
    dispatch(deleteNote(itemId));
    navigation.goBack();
    ToastMessage({
      type: "success",
      text1: "Note deleted successfully!",
      textColor: Colors.success,
    });
  };

  const handleEditNote = () => {
    setEditModalVisible(true);
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>Note not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
        <View style={styles.innerActionContainer}>
          <TouchableOpacity
            onPress={handleEditNote}
            style={[
              styles.actionButtonContainer,
              { backgroundColor: Colors.editButton.backgroundColor },
            ]}
          >
            <MaterialIcons
              name="edit"
              size={24}
              color={Colors.editButton.textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(true)}
            style={[
              styles.actionButtonContainer,
              { backgroundColor: Colors.deleteButton.backgroundColor },
            ]}
          >
            <MaterialIcons name="delete" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.notes}>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <FlatList
          horizontal
          data={note.categories}
          keyExtractor={(item) => nanoid()}
          renderItem={({ item }) => <CategoryCard title={item} count={0} />}
        />
        <Text style={styles.noteContent}>{note.content}</Text>
      </View>

      {isEditModalVisible && (
        <EditNoteModal
          visible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          note={{ ...note, categories: note.categories || [] }}
          noteIndex={note.id}
        />
      )}

      {isDeleteModalVisible && (
        <DeleteNoteModal
          visible={isDeleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          deleteNote={handleDeleteNote}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  actionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButtonContainer: {
    padding: 5,
    borderRadius: 5,
  },
  notes: {
    marginVertical: 50,
    gap: 20,
  },
  noteTitle: {
    fontFamily: "Satoshi-Bold",
    color: Colors.textPrimary,
    fontSize: 24,
  },
  noteContent: {
    fontFamily: "Satoshi-Bold",
    color: Colors.textPrimary,
  },
  errorText: {
    fontFamily: "Satoshi-Bold",
    color: Colors.textPrimary,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default NoteDetail;
