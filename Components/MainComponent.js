import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import SignIn from './SignIn';
import Home from './Home';
import AddChild from './AddChild';
import ChildDetails from './ChildDetails';
import SignUp from './SignUp';
import store from '../Redux/store';
import Screens from './Screens';

const {Screen, Navigator} = createStackNavigator();

const Main = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </Provider>
  );
};

export default Main;
