import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Quiz from '../screens/Quiz';
import QuizCorrected from '../screens/QuizCorrected';
import QuizResult from '../screens/QuizResult';

const Stack = createStackNavigator();

function HomeStack() {

  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
        />
        <Stack.Screen
          name="QuizCorrected"
          component={QuizCorrected}
        />
        <Stack.Screen
          name="QuizResult"
          component={QuizResult}
        />
      </Stack.Navigator>
  );
}

export default HomeStack;