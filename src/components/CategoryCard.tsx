import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../theme/colors";

interface CategoryCardProps {
  title: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, count }) => {
  const [selected, setSelected] = React.useState<boolean>(false);
  return (
    <TouchableOpacity
      onPress={() => setSelected(!selected)}
      style={[
        styles.container,
        selected && {
          backgroundColor: Colors.categoryButtonActive.backgroundColor,
        },
      ]}
    >
      <Text style={styles.categoryTitle}>{title}</Text>
      <View
        style={[
          styles.countContainer,
          selected && {
            backgroundColor:
              Colors.categoryButtonActive.countContainerBackgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.countText,
            selected && { color: Colors.categoryButtonActive.textColor },
          ]}
        >
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.categoryButton.backgroundColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryTitle: {
    color: Colors.textPrimary,
  },
  countContainer: {
    backgroundColor: Colors.categoryButton.countContainerBackgroundColor,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  countText: {
    color: Colors.textPrimary,
    fontSize: 12,
    textAlign: "center",
  },
});

export default CategoryCard;
