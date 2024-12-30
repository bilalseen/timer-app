import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import todoColors from "../../theme/todo/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Card from "../../components/todo/Card";
import { useSelector } from "react-redux";
import { selectCompleted, selectUncompleted } from "../../redux/todoSlice";
import { MaterialIcons } from "@expo/vector-icons";
import AddModal from "../../components/Modals/todo/AddModal";
import parseTodoData from "../../utils/parseTodoData";

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

  const unComplete = useSelector(selectUncompleted);
  const completed = useSelector(selectCompleted);

  const toggleAddModal = () => {
    setAddNoteModalVisible(!addNoteModalVisible);
  };

  useEffect(() => {
    setCompletedTodos(completed);
    setUnCompletedTodos(parseTodoData(unComplete));
  }, [unComplete, completed]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", gap: 15 }}
    >
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={todoColors.background}
      />
      <AnimatedCircularProgress
        size={150}
        width={13}
        fill={
          (completedTodos.length /
            (completedTodos.length + unCompletedTodos.length)) *
          100
        }
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
        <Text style={styles.firstTitleText}>Your're doing great,</Text>
        <Text style={styles.secondTitleText}>your're halfway there!</Text>
      </View>
      <View style={[styles.todosContainer, { gap: 30 }]}>
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
        <View style={styles.todosContainer}>
          <View style={styles.todoTitleContainer}>
            <Text style={styles.todoTitle}>
              Task to do - {completedTodos?.length}
            </Text>
            <TouchableOpacity
              style={styles.moreActionButtonContainer}
              onPress={() => null}
            >
              <MaterialIcons
                name="more-horiz"
                size={24}
                color={todoColors.textPrimary}
              />
            </TouchableOpacity>
          </View>
          {completedTodos.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </View>
      </View>
      <View style={{ height: 100 }}></View>
      <AddModal
        addNoteModalVisible={addNoteModalVisible}
        toggleAddModal={toggleAddModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: todoColors.background,
    padding: 20,
  },
  progressBarTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarText: {
    fontSize: 24,
    color: todoColors.textPrimary,
  },
  firstTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: todoColors.textPrimary,
  },
  secondTitleText: {
    fontSize: 24,
    color: todoColors.textPrimary,
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
  moreActionButtonContainer: {},
});

export default Todo;
