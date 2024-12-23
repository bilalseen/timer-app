import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../theme/colors";

interface HeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (status: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({
  searchText,
  setSearchText,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const ToggleSearchStatus = () => {
    setIsSearchOpen(!isSearchOpen);
    searchText !== "" && setSearchText("");
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);
  };
  return (
    <View style={styles.container}>
      {!isSearchOpen ? (
        <>
          <Text style={styles.titleText}>Timora</Text>
          <TouchableOpacity onPress={ToggleSearchStatus}>
            <MaterialIcons name="search" size={30} color={Colors.textPrimary} />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={(text) => handleChangeText(text)}
            placeholder="Search..."
            placeholderTextColor={Colors.textPrimary}
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={ToggleSearchStatus}
            style={styles.searchOffButton}
          >
            <MaterialIcons
              name="search-off"
              size={30}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 24,
    color: Colors.textPrimary,
    marginLeft: 10,
    fontFamily: "Satoshi-Medium",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    color: Colors.textPrimary,
    flex: 9,
    fontFamily: "Satoshi-Regular",
  },
  searchOffButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
