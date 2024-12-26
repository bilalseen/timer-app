import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Vibration,
  TouchableOpacity,
} from "react-native";
import React from "react";
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

const Card = () => {
  const navigation = useNavigation<any>();
  const [cardMenuStatus, setCardMenuStatus] = React.useState<boolean>(false);
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);

  const toggleCardMenu = () => {
    setCardMenuStatus(!cardMenuStatus);
    !cardMenuStatus && Vibration.vibrate(100);
  };

  const toggleCompletionStatus = () => {
    setIsCompleted(!isCompleted);
  };

  const handleNavigateToNoteDetail = () => {
    navigation.navigate("TodoDetail", { itemId: "1234" });
  };
  return (
    <MenuProvider>
      <Pressable
        style={styles.container}
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
            Card Title
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
            quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nemo, quidem. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nemo, quidem. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Nemo, quidem.
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
