import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./component/homescreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchCity from "./component/searchcity"


//Create a tab navigator that navigates between homescreen and searchcity screen

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-cloud'
            } else if (route.name === 'Search') {
              iconName = 'md-search'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#DCDCDC',
          activeBackgroundColor: '#008b8b',
          inactiveBackgroundColor: '#008b8b'
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} initialParams={{city: "London"}}/>
        <Tab.Screen name="Search" component={SearchCity} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}