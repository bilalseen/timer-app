import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../../theme/colors";
import { useDispatch } from "react-redux";
import { editNote } from "../../redux/notesSlice";

interface EditNoteModalProps {
  visible: boolean;
  onClose: () => void;
  note: { id: number; title: string; content: string };
  noteIndex: number;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  visible,
  onClose,
  note,
  noteIndex,
}) => {
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);

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
            date: new Date().toLocaleDateString("en-CA").toString(),
          },
        })
      );
      onClose();
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
            style={styles.input}
          />
          <TextInput
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
            placeholder="Content"
            style={styles.input}
            multiline
          />
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
    marginBottom: 20,
    paddingLeft: 10,
    color: Colors.textPrimary,
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
