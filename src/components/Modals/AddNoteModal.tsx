import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "../../theme/colors";
interface ModalProps {
  addNoteModalVisible: boolean;
  toggleAddModal: (visible: boolean) => void;
}
const AddNoteModal: React.FC<ModalProps> = ({
  addNoteModalVisible,
  toggleAddModal,
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={addNoteModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            toggleAddModal;
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add a new note</Text>
              <TextInput
                placeholder="Title here.."
                style={styles.inputText}
                placeholderTextColor={Colors.textPrimary}
              />
              <TextInput
                placeholder="Content here.."
                style={styles.inputText}
                placeholderTextColor={Colors.textPrimary}
              />
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
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
                  onPressIn={() => toggleAddModal(false)}
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
    height: 40,
    width: "100%",
    borderBottomColor: Colors.borderWeak,
    borderBottomWidth: 1,
    borderRadius: 10,
    fontFamily: "Satoshi-Bold",
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
