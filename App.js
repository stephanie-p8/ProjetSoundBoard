import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from "./store/store";
import { Provider } from "react-redux";
import PadComponent from './components/pad/padComponent';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tabs = createBottomTabNavigator();

const App = ()=> {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case "Sampler":
                  iconName = focused ? "musical-notes" : "musical-notes-outline";
                  break;
                default:
                  iconName = "ban";
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{ activeTintColor: "tomato", inactiveTintColor: "gray" }}
        >

         
          <Tabs.Screen name="Sampler">
            {(props) => <PadComponent {...props}/>}
          </Tabs.Screen>
         
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
