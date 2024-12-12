import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../theme/colors";
import { HoldItem } from "react-native-hold-menu";

interface NoteCardProps {
  title: string;
  content: string;
  date: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, date }) => {
  const MenuItems = [
    { text: "Reply", onPress: () => {} },
    { text: "Edit", onPress: () => {} },
    { text: "Delete", onPress: () => {} },
  ];
  return (
    <HoldItem
      items={[
        { text: "Actions", isTitle: true, onPress: () => {} },
        { text: "Reply", onPress: () => {} },
        { text: "Edit", onPress: () => {} },
        { text: "Delete", onPress: () => {} },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons
              name="more-vert"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={3} style={styles.contentText}>
          {content}
        </Text>
        <Text style={styles.datetText}>{date}</Text>
      </View>
    </HoldItem>
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
