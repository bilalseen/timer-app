import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Colors from "../../theme/colors";
import { useDispatch } from "react-redux";
import { editNote } from "../../redux/notesSlice";
import ToastMessage from "../../feedback/ToastMessage";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface EditNoteModalProps {
  visible: boolean;
  onClose: () => void;
  note: {
    id: string;
    title: string;
    content: string;
    categories: string[];
    isEdited: boolean;
    image?: string | null;
  };
  noteIndex: string;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  visible,
  onClose,
  note,
  noteIndex,
}) => {
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);
  const [newCategory, setNewCategory] = useState<string>(
    note.categories.join(", ")
  );
  const [image, setImage] = useState<string | null>(
    note.image ? note.image : null
  );

  const [lastCategories, setLastCategories] = useState<string>(
    note.categories.join(", ")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setNewTitle(note.title);
    setNewContent(note.content);
  }, [note]);

  const handleSave = () => {
    if (newTitle.trim() && newContent.trim()) {
      dispatch(
        editNote({
          id: noteIndex,
          note: {
            id: note.id,
            title: newTitle,
            content: newContent,
            categories: newCategory
              .trim()
              .split(",")
              .map((text) => text.trim())
              .filter((text) => text !== ""),
            lastCategories: lastCategories
              .trim()
              .split(",")
              .map((text) => text.trim())
              .filter((text) => text !== ""),
            date: new Date().toISOString(),
            isEdited: true,
            image: image,
          },
        })
      );
      ToastMessage({
        type: "success",
        text1: "Note updated",
        textColor: Colors.success,
      });
      onClose();
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
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Note</Text>
          <TextInput
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
            placeholder="Title"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
          />
          <TextInput
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
            placeholder="Content"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
            multiline
          />
          <TextInput
            value={newCategory}
            onChangeText={(text) => setNewCategory(text)}
            placeholder="Personal, Work, Reminders.."
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
          />
          {!image ? (
            <TouchableOpacity
              onPress={pickImage}
              style={styles.imagePickerContainer}
            >
              <Text style={styles.imagePickerText}>Pick Media</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.pickedImageContainer}>
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
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.button,
                { backgroundColor: Colors.cancelButton.backgroundColor },
              ]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    gap: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.textPrimary,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: Colors.borderWeak,
    paddingLeft: 10,
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
  pickedImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickedImageActionButtonContainer: {
    position: "absolute",
    zIndex: 1,
    right: 30,
    top: -10,
    flexDirection: "row",
    gap: 10,
  },
  pickedImageButton: {
    borderRadius: 50,
    padding: 2,
  },
  pickedImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: Colors.addButtonAlt.backgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
});

export default EditNoteModal;
