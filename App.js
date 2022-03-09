import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "./screens/Chats";
import Settings from "./screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import SignUp from "./screens/SignUp";
import Chat from "./screens/Chat";
import SignIn from "./screens/SignIn";
import { auth } from "./firebaseConfig";
import { Provider } from "react-redux";
import store from "./store";

const ChatsStack = createStackNavigator();

const ChatsScreen = () => {
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen
        name="Chats"
        component={Chats}
        options={{ headerShown: false }}
      />
      <ChatsStack.Screen name="Chat" component={Chat} />
    </ChatsStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();

const SettingsScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const TabsScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("SignUp");
      }
    });
  }, []);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Chats") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Chats" component={ChatsScreen} />
      <Tabs.Screen name="Settings" component={SettingsScreen} />
    </Tabs.Navigator>
  );
};

const MainStack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator headerMode="none" mode="model">
          <MainStack.Screen name="Tabs" component={TabsScreen} />
          <MainStack.Screen name="SignIn" component={SignIn} />
          <MainStack.Screen name="SignUp" component={SignUp} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
