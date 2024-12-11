import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Timer from "../screens/Timer";
import { NavigationContainer } from "@react-navigation/native";
import NoteList from "../screens/notes/NoteList";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NoteList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="NoteList" component={NoteList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
