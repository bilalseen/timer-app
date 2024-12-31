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
import todoColor from "../../../theme/todo/colors";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../redux/todoSlice";
import ToastMessage from "../../../feedback/ToastMessage";
import CalendarPicker from "react-native-calendar-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import todoColors from "../../../theme/todo/colors";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  addNoteModalVisible: boolean;
  toggleAddModal: (visible: boolean) => void;
}

const AddModal: React.FC<ModalProps> = ({
  addNoteModalVisible,
  toggleAddModal,
}) => {
  interface Todo {
    id: string;
    title: string;
    content: string;
    date: string;
    isEdited: boolean;
    completed: boolean;
  }

  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");

  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    content: "",
    date: "",
    isEdited: false,
    completed: false,
  });

  const dispatch = useDispatch();

  const handleAddNote = () => {
    if (todo.title.trim() && todo.content.trim()) {
      const newTodo = {
        ...todo,
        id: uuidv4(),
        date: date,
        isEdited: false,
      };

      dispatch(addTodo(newTodo));
      toggleAddModal(false);
      setTodo({
        id: "",
        title: "",
        content: "",
        date: "",
        isEdited: false,
        completed: false,
      });
      setDate("");
      ToastMessage({
        type: "success",
        text1: "Todo added successfully!",
        text2: "",
        textColor: todoColor.success,
      });
    } else {
      ToastMessage({
        type: "error",
        text1: "Please fill in all fields.",
        textColor: todoColor.error,
      });
    }
  };

  const handleConfirmTime = (selectedTime: Date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(selectedTime.getHours());
    selectedDate.setMinutes(selectedTime.getMinutes());
    setDate(selectedDate.toISOString());
    setTimePickerVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={addNoteModalVisible}
          onRequestClose={() => {
            toggleAddModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {calendarVisible ? (
                <>
                  <Text style={styles.modalTitle}>Select end date</Text>
                  <CalendarPicker
                    onDateChange={(date) => setDate(date.toISOString())}
                    startFromMonday={true}
                    initialDate={new Date()}
                    minDate={new Date()}
                    width={300}
                    height={300}
                    textStyle={{
                      color: todoColor.textPrimary,
                    }}
                    todayTextStyle={{
                      color: todoColor.textSecondary,
                    }}
                    todayBackgroundColor={todoColor.todoContainerBackground}
                    selectedDayStyle={{
                      backgroundColor: todoColor.textPrimary,
                    }}
                  />
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (date) {
                          setCalendarVisible(false);
                          setTimePickerVisible(true);
                        } else {
                          ToastMessage({
                            type: "error",
                            text1: "Please select a date.",
                            textColor: todoColor.error,
                          });
                        }
                      }}
                      style={styles.actionButtonContainer}
                    >
                      <Text style={styles.actionButtonText}>Set Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => {
                        setCalendarVisible(false);
                        setDate("");
                      }}
                      style={styles.actionButtonContainer}
                    >
                      <Text style={styles.actionButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.modalTitle}>Add a new note</Text>
                  <TextInput
                    placeholder="Todo title..."
                    onChangeText={(text) => setTodo({ ...todo, title: text })}
                    style={styles.inputText}
                    placeholderTextColor={todoColor.textPrimary}
                  />
                  <TextInput
                    placeholder="Todo content..."
                    onChangeText={(text) => setTodo({ ...todo, content: text })}
                    style={styles.inputText}
                    placeholderTextColor={todoColor.textPrimary}
                    multiline={true}
                  />
                  {date ? (
                    <>
                      <Text style={styles.imagePickerText}>
                        Selected Date:{" "}
                        {new Date(date).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setCalendarVisible(true)}
                        style={styles.calendarControlButtonContainer}
                      >
                        <Text style={styles.imagePickerText}>Change Date</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setCalendarVisible(true)}
                      style={styles.calendarControlButtonContainer}
                    >
                      <Text style={styles.imagePickerText}>
                        Select Date for Todo's
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      onPress={handleAddNote}
                      style={styles.actionButtonContainer}
                    >
                      <Text style={styles.actionButtonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => {
                        toggleAddModal(false);
                      }}
                      style={styles.actionButtonContainer}
                    >
                      <Text style={styles.actionButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
        <DateTimePickerModal
          isVisible={timePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={() => {
            setTimePickerVisible(false);
            setCalendarVisible(true);
          }}
          customHeaderIOS={() => (
            <View style={styles.customHeader}>
              <Text style={styles.customHeaderText}>Select Time</Text>
            </View>
          )}
          customConfirmButtonIOS={() => (
            <TouchableOpacity style={styles.customConfirmButton}>
              <Text style={styles.customConfirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          )}
          customCancelButtonIOS={() => (
            <TouchableOpacity style={styles.customCancelButton}>
              <Text style={styles.customCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        />
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
    backgroundColor: todoColor.background,
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
    color: todoColor.textPrimary,
  },
  inputText: {
    width: "100%",
    borderBottomColor: todoColor.buttonBackground,
    borderBottomWidth: 1,
    borderRadius: 10,
    color: todoColor.textPrimary,
  },
  calendarControlButtonContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: todoColor.buttonBackground,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerText: {
    color: todoColors.buttonBackground,
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
    backgroundColor: todoColor.buttonBackground,
    padding: 10,
    borderRadius: 10,
  },
  actionButtonText: {
    textAlign: "center",
    color: todoColor.background,
    fontWeight: "bold",
  },
  customHeader: {
    backgroundColor: todoColors.todoContainerBackground,
    padding: 10,
    alignItems: "center",
  },
  customHeaderText: {
    color: todoColors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  customConfirmButton: {
    backgroundColor: todoColors.buttonBackground,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  customConfirmButtonText: {
    color: todoColors.background,
    fontWeight: "bold",
  },
  customCancelButton: {
    backgroundColor: todoColors.error,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  customCancelButtonText: {
    color: todoColors.background,
    fontWeight: "bold",
  },
});

export default AddModal;
