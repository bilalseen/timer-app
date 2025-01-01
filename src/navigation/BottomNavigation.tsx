import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import Timora from "../screens/Timora";
import NoteList from "../screens/notes/NoteList";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAsyncStorageCategories,
  setAsyncStorageData,
} from "../redux/notesSlice";
import Todo from "../screens/todo/Todo";
import todoColors from "../theme/todo/colors";
import {
  setAsyncStorageCompletedTodoData,
  setAsyncStorageTodoData,
} from "../redux/todoSlice";

const BottomNavigation = () => {
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("notes");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getCategories = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("categories");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      return [];
    }
  };

  const getTodoData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  };

  const getCompletedTodoData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("completedTodos");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getData();
      if (data) {
        dispatch(setAsyncStorageData(data));
      }

      const categories = await getCategories();
      if (categories) {
        dispatch(setAsyncStorageCategories(categories));
      }

      const todoData = await getTodoData();
      if (todoData) {
        dispatch(setAsyncStorageTodoData(todoData));
      }

      const completedTodoData = await getCompletedTodoData();
      if (todoData) {
        dispatch(setAsyncStorageCompletedTodoData(completedTodoData));
      }
    })();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.accentPrimary,
        tabBarLabelStyle: {
          fontFamily: "Satoshi-Medium",
        },
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          marginHorizontal: 20,
          bottom: 20,
          borderRadius: 10,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: Colors.backgroundNeutral,
        },
      }}
    >
      <Tab.Screen
        name="Görev Listesi"
        component={Todo}
        options={{
          tabBarActiveTintColor: todoColors.highlight,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NoteList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Timora"
        component={Timora}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clock-digital"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
