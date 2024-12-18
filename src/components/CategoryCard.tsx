import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Colors from "../theme/colors";
import {
  selectActiveCategories,
  setActiveCategories,
} from "../redux/notesSlice";
import { useDispatch, useSelector } from "react-redux";

interface CategoryCardProps {
  title: string;
  count: number;
  isDetailCard?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  count,
  isDetailCard,
}) => {
  const [selected, setSelected] = React.useState<boolean>(false);

  const activeCatogories = useSelector(selectActiveCategories);
  const dispatch = useDispatch();

  activeCatogories.includes(title) && useEffect(() => setSelected(true), []);

  useEffect(() => {
    dispatch(setActiveCategories(selected ? [title] : ["All Notes"]));
  }, [selected]);

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
      {count !== null && !isDetailCard && (
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
      )}
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
