import { View, Text, FlatList } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/notesSlice";

const CategoryList = () => {
  const categories = useSelector(selectCategories);

  return (
    <View>
      <FlatList
        horizontal
        data={categories}
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
