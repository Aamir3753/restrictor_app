import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import Home from './Home';
import AddChild from './AddChild';
import ChildDetails from './ChildDetails';
import SignUp from './SignUp';

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
        <Screen
          name="ChildDetails"
          options={{headerShown: false}}
          component={ChildDetails}
        />
        <Screen
          name="SignUp"
          options={{headerTitle: 'Create Account'}}
          component={SignUp}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Main;
