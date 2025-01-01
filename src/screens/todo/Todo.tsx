import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import todoColors from "../../theme/todo/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Card from "../../components/todo/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllCompleteTodo,
  selectCompleted,
  selectUncompleted,
} from "../../redux/todoSlice";
import AddModal from "../../components/Modals/todo/AddModal";
import parseTodoData from "../../utils/parseTodoData";
import DeleteModal from "../../components/Modals/todo/DeleteModal";
import getBackMessage from "../../utils/getBackMessage";

interface Todo {
  id: string;
  title: string;
  content: string;
  date: string;
  isEdited: boolean;
  completed: boolean;
}

const Todo = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [unCompletedTodos, setUnCompletedTodos] = useState<Todo[]>([]);
  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [message, setMessage] = useState<string>("");

  const dispatch = useDispatch();
  const unComplete = useSelector(selectUncompleted);
  const completed = useSelector(selectCompleted);

  const toggleAddModal = () => {
    setAddNoteModalVisible(!addNoteModalVisible);
  };

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!deleteModalVisible);
  };

  const handleDeleteAllCompletedTodo = () => {
    dispatch(deleteAllCompleteTodo());
  };

  const progress = useMemo(() => {
    const result =
      (completed.length / (completed.length + unComplete.length)) * 100;

    return Number.isNaN(result) ? 0 : result;
  }, [completed, unComplete]);

  const updateTodos = () => {
    setCompletedTodos(completed);
    setUnCompletedTodos(parseTodoData(unComplete));
  };

  const updateMessage = (progress: number) => {
    setMessage(getBackMessage(progress));
  };

  useEffect(() => {
    updateTodos();
    updateMessage(progress);
  }, [unComplete, completed]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", gap: 15 }}
    >
      <StatusBar hidden={true} />
      <AnimatedCircularProgress
        size={150}
        width={13}
        fill={progress}
        rotation={0}
        duration={3000}
        tintColor={todoColors.background}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor={todoColors.primary}
        backgroundWidth={22}
        lineCap={"round"}
      >
        {(fill: number) => (
          <View style={styles.progressBarTextContainer}>
            <Text style={styles.progressBarText}>{Math.round(fill)}%</Text>
            <Text style={[styles.progressBarText, { fontSize: 12 }]}>
              Completed
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View>
        <Text style={styles.progressText}>{message}</Text>
      </View>
      <View style={[styles.todosContainer, { gap: 30 }]}>
        {unCompletedTodos.length > 0 ? (
          <View style={styles.todosContainer}>
            <View style={styles.todoTitleContainer}>
              <Text style={styles.todoTitle}>
                Task to do - {unCompletedTodos?.length}
              </Text>
              <TouchableOpacity
                style={styles.addTodoButtonContainer}
                onPress={toggleAddModal}
              >
                <Text style={styles.addTodoButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
            {unCompletedTodos.map((item, index) => (
              <Card item={item} key={index} />
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.firstAddTodoButtonContainer}
            onPress={toggleAddModal}
          >
            <Text style={styles.firstAddTodoButtonText}>Add Task</Text>
          </TouchableOpacity>
        )}
        {completedTodos.length > 0 && (
          <View style={styles.todosContainer}>
            <View style={styles.todoTitleContainer}>
              <Text style={styles.todoTitle}>
                Task to do - {completedTodos?.length}
              </Text>
              <TouchableOpacity
                style={styles.deleteAllCompletedButton}
                onPress={toggleDeleteModal}
              >
                <Text style={styles.deleteAllCompletedButtonText}>
                  Delete All
                </Text>
              </TouchableOpacity>
            </View>
            {completedTodos.map((item, index) => (
              <Card item={item} key={index} />
            ))}
          </View>
        )}
      </View>

      <View style={{ height: 100 }}></View>
      <AddModal
        addNoteModalVisible={addNoteModalVisible}
        toggleAddModal={toggleAddModal}
      />
      <DeleteModal
        deleteModalVisible={deleteModalVisible}
        toggleDeleteModal={toggleDeleteModal}
        deleteTodo={handleDeleteAllCompletedTodo}
        title={"Delete All Completed Task"}
        content={"Are you sure you want to delete all completed task?"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: todoColors.background,
    padding: 20,
    paddingTop: 50,
  },
  progressBarTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarText: {
    fontSize: 24,
    color: todoColors.textPrimary,
  },
  progressText: {
    fontSize: 24,
    fontWeight: "bold",
    color: todoColors.textPrimary,
    textAlign: "center",
  },
  firstAddTodoButtonContainer: {
    borderColor: todoColors.primary,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  firstAddTodoButtonText: {
    color: todoColors.primary,
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  todosContainer: { flex: 1, width: "100%", gap: 20 },
  todoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: todoColors.textPrimary,
  },
  addTodoButtonContainer: {
    padding: 10,
    backgroundColor: todoColors.primary,
    borderRadius: 10,
  },
  addTodoButtonText: {
    color: todoColors.textSecondary,
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteAllCompletedButton: {
    padding: 10,
    backgroundColor: todoColors.primary,
    borderRadius: 10,
  },
  deleteAllCompletedButtonText: {
    color: todoColors.textSecondary,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Todo;
