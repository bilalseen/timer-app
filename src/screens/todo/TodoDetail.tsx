import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import todoColors from "../../theme/todo/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "date-fns";
import formattedDate from "../../utils/formatDate";
import { Formik } from "formik";
import { editTodo } from "../../redux/todoSlice";

interface Todo {
  id: string;
  title: string;
  content: string;
  date: string;
  isEdited: boolean;
  completed: boolean;
}

type RouteParams = {
  params: {
    itemId: string;
    isEditing?: boolean;
    isCompleted?: boolean;
  };
};

const TodoDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams>>();
  const { itemId, isEditing, isCompleted } = route.params;

  const dispatch = useDispatch();
  console.log("itemId: " + itemId);

  const todo = useSelector(
    (state: { todos: { todos: Todo[]; completed: Todo[] } }) =>
      !isCompleted
        ? state.todos.todos.find((todo: Todo) => todo.id === itemId)
        : state.todos.completed.find((todo: Todo) => todo.id === itemId)
  );

  const toggleEditMode = () => {
    setEditModStatus(!editModStatus);
  };

  const [editModStatus, setEditModStatus] = React.useState<boolean>(
    isEditing ? isEditing : false
  );

  const updateTodo = (values: { title: string; content: string }) => {
    dispatch(
      editTodo({
        id: itemId,
        title: values.title,
        content: values.content,
      })
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={todoColors.background}
        hidden={true}
      />
      {editModStatus ? (
        <>
          {todo && (
            <Formik
              initialValues={{ title: todo.title, content: todo.content }}
              onSubmit={(values) => updateTodo(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={toggleEditMode}>
                      <MaterialIcons
                        name="cancel"
                        size={30}
                        color={todoColors.textPrimary}
                      />
                    </TouchableOpacity>
                    <View style={styles.innerActionContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          handleSubmit();
                          toggleEditMode();
                        }}
                        style={[
                          styles.actionButtonContainer,
                          { backgroundColor: todoColors.primary },
                        ]}
                      >
                        <Text style={styles.actionButtonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <TextInput
                      style={{
                        color: todoColors.textPrimary,
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      value={values.title}
                    />
                    <TextInput
                      style={{
                        color: todoColors.textPrimary,
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                      onChangeText={handleChange("content")}
                      onBlur={handleBlur("content")}
                      value={values.content}
                    />
                  </View>
                </>
              )}
            </Formik>
          )}
        </>
      ) : (
        <>
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="arrow-back"
                size={30}
                color={todoColors.textPrimary}
              />
            </TouchableOpacity>
            <View style={styles.innerActionContainer}>
              <TouchableOpacity
                onPress={toggleEditMode}
                style={[styles.actionButtonContainer]}
              >
                <MaterialIcons
                  name="edit"
                  size={30}
                  color={todoColors.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => null}
                style={[styles.actionButtonContainer]}
              >
                <MaterialIcons
                  name="delete"
                  size={30}
                  color={todoColors.textPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>
          {todo && (
            <View style={styles.todoContentContainer}>
              <Text
                style={{
                  color: todoColors.textPrimary,
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {todo.title}
              </Text>
              <Text style={{ color: todoColors.textPrimary, fontSize: 20 }}>
                {todo.content}
              </Text>
              <Text
                style={{
                  color: todoColors.textPrimary,
                  fontSize: 12,
                  textAlign: "right",
                }}
              >
                {todo.isEdited ? "Updated " : ""}
                {formattedDate({ noteDate: todo.date })}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: todoColors.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  actionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  actionButtonText: {
    fontFamily: "Satoshi-Bold",
    color: todoColors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  todoContentContainer: {
    flex: 1,
    gap: 20,
    paddingVertical: 20,
  },
});

export default TodoDetail;
