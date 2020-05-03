import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import Home from './Home';
import AddChild from './AddChild';

const {Screen, Navigator} = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="SignIn">
        <Screen
          options={{headerShown: false}}
          name="SignIn"
          component={SignIn}
        />
        <Screen name="Home" options={{headerShown: false}} component={Home} />
        <Screen
          name="AddChild"
          options={{title: 'Add New'}}
          component={AddChild}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Main;
