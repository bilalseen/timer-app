import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "../../theme/colors";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/notesSlice";
import { nanoid } from "@reduxjs/toolkit";
import ToastMessage from "../../feedback/ToastMessage";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface ModalProps {
  addNoteModalVisible: boolean;
  toggleAddModal: (visible: boolean) => void;
}

const AddNoteModal: React.FC<ModalProps> = ({
  addNoteModalVisible,
  toggleAddModal,
}) => {
  interface Note {
    id: string;
    title: string;
    content: string;
    categories: string[];
    date: string;
    image: string | null;
  }

  const [image, setImage] = useState<string | null>(null);

  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    content: "",
    categories: [],
    date: "",
    image: null,
  });

  const [category, setCategory] = useState<string>("");

  const dispatch = useDispatch();

  const handleAddNote = () => {
    const categoriesArray = category
      .trim()
      .split(",")
      .map((text) => text.trim())
      .filter((text) => text !== "");
    if (note.title.trim() && note.content.trim()) {
      const newNote = {
        ...note,
        id: nanoid(),
        date: new Date().toISOString(),
        categories: category ? categoriesArray : [],
        image: image,
        lastCategories: [],
        isEdited: false,
      };

      dispatch(addNote(newNote));
      toggleAddModal(false);
      setImage(null);
      setNote({
        id: "",
        title: "",
        content: "",
        categories: [],
        date: "",
        image: null,
      });
      setCategory("");
      ToastMessage({
        type: "success",
        text1: "Note added successfully!",
        text2: "",
        textColor: Colors.success,
      });
    } else {
      ToastMessage({
        type: "error",
        text1: "Please fill in all fields.",
        textColor: Colors.error,
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={addNoteModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            toggleAddModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add a new note</Text>
              <TextInput
                placeholder="Title here.."
                onChangeText={(text) => setNote({ ...note, title: text })}
                style={styles.inputText}
                placeholderTextColor={Colors.textSecondary}
              />
              <TextInput
                placeholder="Content here.."
                onChangeText={(text) => setNote({ ...note, content: text })}
                style={styles.inputText}
                placeholderTextColor={Colors.textSecondary}
                multiline={true}
              />
              <TextInput
                placeholder="Personal, Work, Reminders.."
                onChangeText={(text) => setCategory(text)}
                style={styles.inputText}
                placeholderTextColor={Colors.textSecondary}
              />
              {!image ? (
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imagePickerContainer}
                >
                  <Text style={styles.imagePickerText}>Pick Media</Text>
                </TouchableOpacity>
              ) : (
                <View>
                  <View style={styles.pickedImageActionButtonContainer}>
                    <TouchableOpacity
                      onPress={pickImage}
                      style={[
                        styles.pickedImageButton,
                        {
                          backgroundColor: Colors.editButton.backgroundColor,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name="change-circle"
                        size={20}
                        color={Colors.textPrimary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setImage(null)}
                      style={[
                        styles.pickedImageButton,
                        {
                          backgroundColor: Colors.deleteButton.backgroundColor,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name="delete"
                        size={20}
                        color={Colors.textPrimary}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: image }} style={styles.pickedImage} />
                </View>
              )}
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  onPress={handleAddNote}
                  style={[
                    styles.actionButtonContainer,
                    {
                      backgroundColor: Colors.addButtonAlt.backgroundColor,
                    },
                  ]}
                >
                  <Text style={styles.actionButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    toggleAddModal(false);
                    setImage(null);
                  }}
                  style={[
                    styles.actionButtonContainer,
                    { backgroundColor: Colors.cancelButton.backgroundColor },
                  ]}
                >
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
  },
  modalTitle: {
    fontFamily: "Satoshi-Bold",
    color: Colors.textPrimary,
  },
  inputText: {
    width: "100%",
    borderBottomColor: Colors.borderWeak,
    borderBottomWidth: 1,
    borderRadius: 10,
    fontFamily: "Satoshi-Bold",
    color: Colors.textPrimary,
  },
  imagePickerContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.accentPrimary,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerText: {
    color: Colors.textActive,
    fontFamily: "Satoshi-Bold",
  },
  pickedImageActionButtonContainer: {
    position: "absolute",
    zIndex: 1,
    right: -10,
    top: -10,
    flexDirection: "row",
    gap: 10,
  },
  pickedImageButton: {
    borderRadius: 50,
    padding: 2,
  },
  pickedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  actionButtonContainer: {
    minWidth: 100,
    backgroundColor: Colors.backgroundNeutral,
    padding: 10,
    borderRadius: 10,
  },
  actionButtonText: {
    textAlign: "center",
    color: Colors.textPrimary,
    fontFamily: "Satoshi-Bold",
  },
});

export default AddNoteModal;
