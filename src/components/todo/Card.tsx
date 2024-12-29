import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Vibration,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import todoColors from "../../theme/todo/colors";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { toggleCompleteTodoStatus } from "../../redux/todoSlice";
import formattedDate from "../../utils/formatDate";

interface TodoCardProps {
  item: {
    id: string;
    title: string;
    content: string;
    date: string;
    isEdited: boolean;
    completed: boolean;
  };
}

const Card: React.FC<TodoCardProps> = ({ item }) => {
  const navigation = useNavigation<any>();
  const [cardMenuStatus, setCardMenuStatus] = React.useState<boolean>(false);
  const [isCompleted, setIsCompleted] = React.useState<boolean>(item.completed);

  const dispatch = useDispatch();
  const toggleCardMenu = () => {
    setCardMenuStatus(!cardMenuStatus);
    !cardMenuStatus && Vibration.vibrate(100);
  };

  const toggleCompletionStatus = () => {
    dispatch(toggleCompleteTodoStatus(item.id));
  };

  useEffect(() => {
    setIsCompleted(item.completed);
  }, [item.completed]);

  const handleNavigateToNoteDetail = () => {
    navigation.navigate("TodoDetail", { itemId: "1234" });
  };

  const getBackgroundColorBasedOnDate = () => {
    const currentDate = new Date();
    const todoDate = new Date(item.date);
    const diffInMilliseconds = todoDate.getTime() - currentDate.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 3600);
    const diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

    if (diffInMilliseconds < 0) {
      return todoColors.pastDue;
    } else if (diffInHours <= 1) {
      return todoColors.lessThanOneHour;
    } else if (diffInHours <= 6) {
      return todoColors.lessThanSixHours;
    } else if (diffInHours <= 12) {
      return todoColors.lessThanTwelveHours;
    } else if (diffInDays <= 1) {
      return todoColors.lessThanOneDay;
    }
  };

  return (
    <MenuProvider>
      <Pressable
        style={[
          styles.container,
          {
            shadowColor: getBackgroundColorBasedOnDate(),
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
        onLongPress={toggleCardMenu}
        onPress={handleNavigateToNoteDetail}
      >
        <View style={styles.menuContainer}>
          <Menu opened={cardMenuStatus} onBackdropPress={toggleCardMenu}>
            <MenuTrigger style={{ display: "none" }}>
              <MaterialIcons
                name="more-vert"
                size={24}
                color={todoColors.textPrimary}
              />
            </MenuTrigger>
            <MenuOptions customStyles={menuStyles}>
              <MenuOption onSelect={() => null}>
                <View style={styles.menuOption}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={todoColors.textPrimary}
                  />
                  <Text
                    style={[
                      styles.menuOptionText,
                      { color: todoColors.textPrimary },
                    ]}
                  >
                    Edit
                  </Text>
                </View>
              </MenuOption>
              <MenuOption onSelect={() => null}>
                <View style={styles.menuOption}>
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={todoColors.textPrimary}
                  />
                  <Text
                    style={[
                      styles.menuOptionText,
                      { color: todoColors.textPrimary },
                    ]}
                  >
                    Delete
                  </Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={toggleCompletionStatus}
        >
          <MaterialCommunityIcons
            name={
              !isCompleted
                ? "checkbox-blank-circle-outline"
                : "checkbox-marked-circle"
            }
            size={24}
            color={
              !isCompleted
                ? todoColors.textPrimary
                : todoColors.completedTaskLine
            }
          />
        </TouchableOpacity>
        <View style={styles.todoContentContainer}>
          <Text
            style={[
              styles.todoTitle,
              {
                color: isCompleted
                  ? todoColors.completedTaskLine
                  : todoColors.textPrimary,
                textDecorationLine: isCompleted ? "line-through" : "none",
              },
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.todoContent,
              {
                color: isCompleted
                  ? todoColors.completedTaskLine
                  : todoColors.textPrimary,
                textDecorationLine: isCompleted ? "line-through" : "none",
              },
            ]}
            numberOfLines={3}
          >
            {item.content}
          </Text>
          <Text style={styles.todoDate}>
            {formattedDate({ noteDate: item.date })}
          </Text>
        </View>
      </Pressable>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: todoColors.todoContainerBackground,
    minHeight: 100,
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  menuContainer: { position: "absolute", right: 10, top: 10 },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoContentContainer: { flex: 1, gap: 5 },
  todoContent: {},
  todoDate: { textAlign: "right", color: todoColors.textPrimary, fontSize: 12 },
  checkboxContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  menuOptionText: {
    fontSize: 16,
    color: todoColors.textPrimary,
  },
});

const menuStyles = {
  optionsContainer: {
    borderRadius: 8,
    backgroundColor: todoColors.todoContainerBackground,
    padding: 5,
  },
};

export default Card;
