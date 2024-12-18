import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { useDispatch } from "react-redux";
import { deleteNote } from "../redux/notesSlice";
import DeleteNoteModal from "./Modals/DeleteNoteModal";
import ToastMessage from "../feedback/ToastMessage";

interface NoteCardProps {
  item: {
    id: string;
    title: string;
    content: string;
    categories: string[];
    date: string;
  };
}

const NoteCard: React.FC<NoteCardProps> = ({ item }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] =
    React.useState<boolean>(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleEdit = () => {
    console.log("Edit note:", item.id);
    navigation.navigate("NoteDetail", { itemId: item.id, openModal: true });
  };

  const handleDelete = () => {
    dispatch(
      deleteNote({ id: item.id, noteCategories: item?.categories || [] })
    );
    ToastMessage({
      type: "success",
      text1: "Note deleted successfully!",
      textColor: Colors.success,
    });
  };

  const handleNavigateToNoteDetail = () => {
    navigation.navigate("NoteDetail", { itemId: item.id });
  };

  return (
    <MenuProvider>
      <TouchableOpacity
        style={styles.container}
        onPress={handleNavigateToNoteDetail}
      >
        <View style={styles.header}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Menu>
            <MenuTrigger>
              <MaterialIcons
                name="more-vert"
                size={24}
                color={Colors.textPrimary}
              />
            </MenuTrigger>
            <MenuOptions customStyles={menuStyles}>
              <MenuOption onSelect={handleEdit}>
                <View style={styles.menuOption}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={Colors.editButton.textColorAlt}
                  />
                  <Text
                    style={[
                      styles.menuOptionText,
                      { color: Colors.editButton.textColorAlt },
                    ]}
                  >
                    Edit
                  </Text>
                </View>
              </MenuOption>
              <MenuOption onSelect={() => setDeleteModalVisible(true)}>
                <View style={styles.menuOption}>
                  <MaterialIcons name="delete" size={20} color="red" />
                  <Text style={[styles.menuOptionText, { color: "red" }]}>
                    Delete
                  </Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>

        <Text numberOfLines={3} style={styles.contentText}>
          {item.content}
        </Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </TouchableOpacity>
      <DeleteNoteModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        deleteNote={handleDelete}
      />
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 20,
    marginVertical: 10,
    borderRadius: 20,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textPrimary,
    fontSize: 20,
  },
  contentText: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textPrimary,
  },
  dateText: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textSecondary,
    textAlign: "right",
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  menuOptionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

const menuStyles = {
  optionsContainer: {
    borderRadius: 8,
    backgroundColor: Colors.backgroundNeutral,
    padding: 5,
  },
};

export default NoteCard;
