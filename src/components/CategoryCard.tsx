import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../theme/colors";

interface CategoryCardProps {
  title: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.background,
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
