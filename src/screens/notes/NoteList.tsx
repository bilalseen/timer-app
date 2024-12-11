import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../theme/color";

const NoteList = () => {
  return (
    <View style={styles.container}>
      <Text>NoteList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});

export default NoteList;
