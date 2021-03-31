import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './../screens/home';
import { AboutScreen } from './../screens/about';
import { QuestionsScreen } from './../screens/questions';
import { ResultScreen } from './../screens/results';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='About' component={AboutScreen}/>
    <Screen name='Questions' component={QuestionsScreen}/>
    <Screen name='Results' component={ResultScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);
