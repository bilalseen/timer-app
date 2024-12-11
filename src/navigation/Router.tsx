import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Timer from "../screens/Timer";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Timer" component={Timer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
