import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import SignIn from './SignIn';
import Home from './Home';
import AddChild from './AddChild';
import ChildDetails from './ChildDetails';
import SignUp from './SignUp';
import QrScanner from './ChildScreens/QrCodeScanner';
import ChildMap from './ChildScreens/MapScreen';
const {Screen, Navigator} = createStackNavigator();

const Screens = props => {
  const {Authentication} = props;
  if (Authentication.isAuthenticated && !Authentication.user.isChild) {
    return (
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          options={{
            headerLeft: () => null,
            headerTitle: 'My List',
          }}
          component={Home}
        />
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
      </Navigator>
    );
  } else if (Authentication.isAuthenticated && Authentication.user.isChild) {
    return (
      <Navigator initialRouteName="ChildMap">
        <Screen
          name="ChildMap"
          options={{headerShown: false}}
          component={ChildMap}
        />
      </Navigator>
    );
  } else {
    return (
      <Navigator initialRouteName="SignIn">
        <Screen
          options={{headerShown: false}}
          name="SignIn"
          component={SignIn}
        />
        <Screen
          name="SignUp"
          options={{headerTitle: 'Create Account'}}
          component={SignUp}
        />
        <Screen
          options={{headerShown: false}}
          name="QrScanner"
          component={QrScanner}
        />
      </Navigator>
    );
  }
};

const mapStateToProps = store => ({
  Authentication: store.Authentication,
});
export default connect(mapStateToProps)(Screens);
