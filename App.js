import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SamplerEditionNavigation from "./components/navigation/navigation";
import LibraryComponent from './components/library/libraryComponent';

const Tabs = createBottomTabNavigator();

const App = ()=> {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Tabs.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  switch (route.name) {
                    case "Sampler":
                      iconName = focused ? "musical-notes" : "musical-notes-outline";
                      break;
                    case "Library":
                      iconName = focused ? "library" : "library-outline";
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

            
              <Tabs.Screen name="Sampler"  component={SamplerEditionNavigation}/>
              <Tabs.Screen name="Library">
                {(props) => <LibraryComponent  {...props} />}
              </Tabs.Screen>
            
            </Tabs.Navigator>
          </NavigationContainer>
        </PersistGate>
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
