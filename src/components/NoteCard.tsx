import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

interface NoteCardProps {
  item: {
    id: string;
    title: string;
    content: string;
    date: string;
  };
}

const NoteCard: React.FC<NoteCardProps> = ({ item }) => {
  const navigation = useNavigation<any>();
  const handleNavigateToNoteDetail = () => {
    navigation.navigate("NoteDetail", { itemId: item.id });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigateToNoteDetail}
    >
      <View style={styles.header}>
        <Text style={styles.titleText}>{item.title}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons
            name="more-vert"
            size={24}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={3} style={styles.contentText}>
        {item.content}
      </Text>
      <Text style={styles.datetText}>{item.date}</Text>
    </TouchableOpacity>
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
  },
  titleText: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textPrimary,
    fontSize: 20,
    maxWidth: "80%",
  },
  moreButton: {},
  contentText: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textPrimary,
  },
  datetText: {
    fontFamily: "Satoshi-Regular",
    color: Colors.textSecondary,
    textAlign: "right",
  },
});

export default NoteCard;
