import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import todoColors from "../../../theme/todo/colors";

interface EditNoteModalProps {
  deleteModalVisible: boolean;
  toggleDeleteModal: () => void;
  deleteTodo: () => void;
  title: string;
  content: string;
}

const DeleteModal: React.FC<EditNoteModalProps> = ({
  deleteModalVisible,
  toggleDeleteModal,
  deleteTodo,
  title,
  content,
}) => {
  return (
    <Modal
      transparent={true}
      visible={deleteModalVisible}
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalContentText}>{content}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => {
                deleteTodo();
                toggleDeleteModal();
              }}
              style={[
                styles.button,
                { backgroundColor: todoColors.buttonBackground },
              ]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleDeleteModal}
              style={[
                styles.button,
                { backgroundColor: todoColors.buttonBackground },
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
    backgroundColor: todoColors.background,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: todoColors.textPrimary,
    fontWeight: "bold",
  },
  modalContentText: {
    textAlign: "center",
    marginBottom: 20,
    color: todoColors.textPrimary,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: todoColors.buttonBackground,
    marginBottom: 20,
    paddingLeft: 10,
    color: todoColors.textPrimary,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: todoColors.buttonBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: todoColors.textSecondary,
    fontSize: 16,
  },
});

export default DeleteModal;
