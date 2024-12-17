import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../theme/colors";

interface EditNoteModalProps {
  visible: boolean;
  onClose: () => void;
  deleteNote: () => void;
}

const DeleteNoteModal: React.FC<EditNoteModalProps> = ({
  visible,
  onClose,
  deleteNote,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Note</Text>
          <Text style={styles.modalExplanationText}>
            Are you sure you want to delete this note?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => deleteNote()}
              style={[
                styles.button,
                { backgroundColor: Colors.deleteButton.backgroundColor },
              ]}
            >
              <Text style={styles.buttonText}>Delete</Text>
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
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
    marginBottom: 20,
    color: Colors.textPrimary,
  },
  modalExplanationText: {
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
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
    fontFamily: "Satoshi-Regular",
  },
});

export default DeleteNoteModal;
