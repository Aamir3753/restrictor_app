import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../Redux/store';
import Screens from './Screens';

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default Main;
