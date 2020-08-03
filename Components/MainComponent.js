import React from 'react';
import {NativeModules, DeviceEventEmitter, Button} from 'react-native';
import {withLocationPermissions} from './hoc/withLocationPermissions';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../Redux/store';
import Screens from './Screens';

class Main extends React.Component {
  // componentDidMount() {
  //   this.subscription = DeviceEventEmitter.addListener(
  //     NativeModules.LocationManager.JS_LOCATION_EVENT_NAME,
  //     LocationCoordinates => {
  //       console.log('test location', LocationCoordinates);
  //       // console.log(
  //       //   `Received Coordinates from native side at ${new Date(
  //       //     e.timestamp,
  //       //   ).toTimeString()}: `,
  //       //   e.latitude,
  //       //   e.longitude,
  //       // );
  //     },
  //   );
  // }
  testLocation = async () => {
    const {locationPermissionGranted, requestLocationPermission} = this.props;
    if (!locationPermissionGranted) {
      const granted = await requestLocationPermission();
      if (granted) {
        console.log('location started');
        return NativeModules.LocationManager.startBackgroundLocation();
      }
    }
    console.log('location started', NativeModules.LocationManager);
    NativeModules.LocationManager.startBackgroundLocation();
    this.subscription = DeviceEventEmitter.addListener(
      NativeModules.LocationManager.JS_LOCATION_EVENT_NAME,
      LocationCoordinates => {
        console.log('location fired',LocationCoordinates);
        // console.log('test location', LocationCoordinates);
        // console.log(
        //   `Received Coordinates from native side at ${new Date(
        //     e.timestamp,
        //   ).toTimeString()}: `,
        //   e.latitude,
        //   e.longitude,
        // );
      },
    );
  };

  render() {
    return (
      <Provider store={store}>
        <Button onPress={this.testLocation} title="Test Location" />
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default withLocationPermissions(Main);
