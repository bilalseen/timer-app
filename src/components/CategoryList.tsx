import { View, Text, FlatList } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const categoriesExample = [
    {
      id: 1,
      name: "Category 1",
      count: 6,
    },
    {
      id: 2,
      name: "Category 2",
      count: 5,
    },
    {
      id: 3,
      name: "Category 3",
      count: 10,
    },
    {
      id: 4,
      name: "Cgory 4",
      count: 3,
    },
  ];
  return (
    <View>
      <FlatList
        horizontal
        data={categoriesExample}
        ListHeaderComponent={() => (
          <CategoryCard title="All Notes" count={18} />
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard title={item.name} count={item.count} />
        )}
      />
    </View>
  );
};

export default CategoryList;
