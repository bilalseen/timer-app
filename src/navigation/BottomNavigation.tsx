import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import Timora from "../screens/Timora";
import NoteList from "../screens/notes/NoteList";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "../theme/colors";

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.accentPrimary,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          marginHorizontal: 20,
          bottom: 20,
          borderRadius: 10,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: Colors.backgroundNeutral,
        },
      }}
    >
      <Tab.Screen
        name="Notes"
        component={NoteList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Timora"
        component={Timora}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clock-digital"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
