import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import BottomNavigation from "./BottomNavigation";
import { Provider } from "react-redux";
import store from "../redux/store";
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Router;
