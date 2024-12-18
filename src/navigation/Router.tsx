import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import BottomNavigation from "./BottomNavigation";
import { Provider } from "react-redux";
import store from "../redux/store";
import NoteDetail from "../screens/notes/NoteDetail";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
          <Stack.Screen name="NoteDetail" component={NoteDetail} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default Router;
