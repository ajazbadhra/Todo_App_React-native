import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import 'react-native-gesture-handler'
import Splash from './src/screens/Splash'
import Done from './src/screens/Done'
import Todo from './src/screens/Todo'
import Task from './src/screens/Task'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
FontAwesome.loadFont()

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let IconName;
            if (route.name === 'Todo') {
              IconName = 'list'
              size = focused ? 25 : 20;
            }
            else if (route.name === 'Done') {
              IconName = 'check-square'
              size = focused ? 25 : 20;
            }
            return (
              <FontAwesome
                name={IconName}
                color={color}
                size={size}
              />
            )
          },
          tabBarActiveTintColor: '#0080ff',
          tabBarInactiveTintColor: '#777777'
        })
      }
    >
      <Tab.Screen
        name='Todo'
        component={Todo}
        options={{
          headerShown: false,

        }}
      />
      <Tab.Screen
        name='Done'
        component={Done}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Splash' component={Splash}
            options={{
              headerShown: false
            }
            }
          />
          <Stack.Screen name='mytask' component={HomeTabs} />
          <Stack.Screen name='Task' component={Task} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({})
