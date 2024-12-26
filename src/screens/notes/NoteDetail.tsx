import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../theme/colors";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, editNote } from "../../redux/notesSlice";
import EditNoteModal from "../../components/Modals/EditNoteModal";
import DeleteNoteModal from "../../components/Modals/DeleteNoteModal";
import CategoryCard from "../../components/CategoryCard";
import { nanoid } from "@reduxjs/toolkit";
import ToastMessage from "../../feedback/ToastMessage";
import formattedDate from "../../utils/formatDate";
import { useVideoPlayer, VideoView } from "expo-video";
import * as ImagePicker from "expo-image-picker";

type RouteParams = {
  params: {
    itemId: string;
    openModal: boolean;
  };
};

interface NoteProps {
  id: string;
  title: string;
  content: string;
  date: string;
  categories?: string[];
  isEdited: boolean;
  image?: string | null;
}

const NoteDetail = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const { itemId, openModal } = route.params;

  useEffect(() => {
    openModal && setEditModalVisible(true);
  }, [openModal]);

  const note = useSelector((state: { notes: { notes: NoteProps[] } }) =>
    state.notes.notes.find((note) => note.id === itemId)
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(
    note?.image ? note.image : null
  );

  const handleDeleteNote = () => {
    dispatch(
      deleteNote({ id: itemId, noteCategories: note?.categories || [] })
    );
    navigation.goBack();
    ToastMessage({
      type: "success",
      text1: "Note deleted successfully!",
      textColor: Colors.success,
    });
  };

  const handleEditNote = () => {
    setEditModalVisible(true);
  };

  const isItVideo = note?.image?.includes("mp4");

  const player = useVideoPlayer(image, (player) => {
    player.loop = false;
    player.pause();
  });

  const [newTitle, setNewTitle] = useState(note?.title);
  const [newContent, setNewContent] = useState(note?.content);
  const [newCategory, setNewCategory] = useState<string>(
    note?.categories ? note.categories.join(", ") : ""
  );
  const [lastCategories, setLastCategories] = useState<string>(
    note?.categories ? note.categories.join(", ") : ""
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (newTitle?.trim() && newContent?.trim()) {
      dispatch(
        editNote({
          id: note?.id ? note.id : "",
          note: {
            id: note?.id,
            title: newTitle,
            content: newContent,
            categories: newCategory
              .trim()
              .split(",")
              .map((text) => text.trim())
              .filter((text) => text !== ""),
            lastCategories: lastCategories
              .trim()
              .split(",")
              .map((text) => text.trim())
              .filter((text) => text !== ""),
            date: new Date().toISOString(),
            isEdited: true,
            image: image,
          },
        })
      );
      ToastMessage({
        type: "success",
        text1: "Note updated",
        textColor: Colors.success,
      });
      setEditModalVisible(false);
    }
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>Note not found!</Text>
      </View>
    );
  }

  if (isEditModalVisible) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => setEditModalVisible(false)}>
            <MaterialIcons name="close" size={30} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.innerActionContainer}>
            <TouchableOpacity
              onPress={handleSave}
              style={[
                styles.actionButtonContainer,
                {
                  backgroundColor: Colors.editButton.backgroundColor,
                  padding: 10,
                },
              ]}
            >
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.notes}>
          <TextInput
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
            style={styles.noteTitle}
            multiline
          />

          <TextInput
            value={newCategory}
            onChangeText={(text) => setNewCategory(text)}
            style={styles.noteCategories}
            multiline
          />

          {image ? (
            <View>
              {isItVideo ? (
                <VideoView
                  style={styles.video}
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                />
              ) : (
                <View style={styles.pickedImageContainer}>
                  <View style={styles.pickedImageActionButtonContainer}>
                    <TouchableOpacity
                      onPress={pickImage}
                      style={[
                        styles.pickedImageButton,
                        {
                          backgroundColor: Colors.editButton.backgroundColor,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name="change-circle"
                        size={20}
                        color={Colors.textPrimary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setImage(null)}
                      style={[
                        styles.pickedImageButton,
                        {
                          backgroundColor: Colors.deleteButton.backgroundColor,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name="delete"
                        size={20}
                        color={Colors.textPrimary}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: image }} style={styles.pickedImage} />
                </View>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              style={styles.imagePickerContainer}
            >
              <Text style={styles.imagePickerText}>Pick Media</Text>
            </TouchableOpacity>
          )}
          <TextInput
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
            style={styles.noteContent}
            multiline
          />
        </View>
        {isDeleteModalVisible && (
          <DeleteNoteModal
            visible={isDeleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            deleteNote={handleDeleteNote}
          />
        )}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
        <View style={styles.innerActionContainer}>
          <TouchableOpacity
            onPress={handleEditNote}
            style={[
              styles.actionButtonContainer,
              { backgroundColor: Colors.editButton.backgroundColor },
            ]}
          >
            <MaterialIcons
              name="edit"
              size={24}
              color={Colors.editButton.textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(true)}
            style={[
              styles.actionButtonContainer,
              { backgroundColor: Colors.deleteButton.backgroundColor },
            ]}
          >
            <MaterialIcons name="delete" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.notes}>
        <Text style={styles.noteDate}>
          {(note.isEdited ? "Updated " : "") +
            formattedDate({ noteDate: note.date })}
        </Text>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <FlatList
          horizontal
          data={note.categories}
          keyExtractor={(item) => nanoid()}
          renderItem={({ item }) => (
            <CategoryCard title={item} count={0} isDetailCard={true} />
          )}
        />
        {note.image && (
          <View>
            {isItVideo ? (
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            ) : (
              <Image source={{ uri: note.image }} style={styles.noteImage} />
            )}
          </View>
        )}
        <Text style={styles.noteContent}>{note.content}</Text>
      </View>
      {isDeleteModalVisible && (
        <DeleteNoteModal
          visible={isDeleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          deleteNote={handleDeleteNote}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    paddingTop: 20,
    paddingHorizontal: 10,
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
    color: Colors.textPrimary,
    fontSize: 16,
  },
  notes: {
    marginVertical: 50,
    gap: 20,
  },
  noteDate: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textActive,
    fontSize: 12,
  },
  noteTitle: {
    fontFamily: "Satoshi-Bold",
    color: Colors.textPrimary,
    fontSize: 24,
  },
  noteCategories: {
    fontFamily: "Satoshi-Bold",
    color: Colors.textActive,
    fontSize: 20,
  },
  noteImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  imagePickerContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.accentPrimary,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerText: {
    color: Colors.textActive,
    fontFamily: "Satoshi-Bold",
  },
  pickedImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickedImageActionButtonContainer: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: -10,
    flexDirection: "row",
    gap: 10,
  },
  pickedImageButton: {
    borderRadius: 50,
    padding: 2,
  },
  pickedImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  video: {
    width: 350,
    height: 275,
  },
  noteContent: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textPrimary,
  },
  errorText: {
    fontFamily: "Satoshi-Bold",
    color: Colors.textPrimary,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default NoteDetail;
