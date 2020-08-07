import React from 'react';
import {
  Dimensions,
  View,
  Text,
  NativeModules,
  DeviceEventEmitter,
  AsyncStorage,
} from 'react-native';
import {withLocationPermissions} from '../../hoc/withLocationPermissions';
import MapView, {Marker, Polygon} from 'react-native-maps';
import connectSocket, {sendLocation} from '../../../socket.io';
import Axios from 'axios';
import {baseUrl} from '../../../Shared/constants';
import Geolocation from 'react-native-geolocation-service';

class ChildScreen extends React.Component {
  state = {
    child: null,
    location: null,
  };
  mapPolygon = () => {
    const {child} = this.state;
    return child.location.polygon.coordinates[0].map(points => ({
      latitude: points[1],
      longitude: points[0],
    }));
  };
  authenticateChild = async () => {
    const shortId = await AsyncStorage.getItem('shortId');
    try {
      this.setState({isLoading: true});
      const resp = await Axios.post(
        baseUrl + 'api/v1/childs/authenticateChild',
        {
          shortId: shortId,
        },
      );
      this.setState({child: resp.data.child});
    } catch (err) {
      this.setState({isLoading: false});
      if (err.response) {
        alert(err.response.data.message);
        return;
      }
      alert(err.message);
    }
  };
  startBackgroundLocation = async () => {
    const {locationPermissionGranted, requestLocationPermission} = this.props;
    if (!locationPermissionGranted) {
      const granted = await requestLocationPermission();
      if (granted) {
        return NativeModules.LocationManager.startBackgroundLocation();
      }
    }
    NativeModules.LocationManager.startBackgroundLocation();
  };
  watchCurrentLocation() {
    Geolocation.watchPosition(
      location => {
        this.setState({
          location: location.coords,
        });
      },
      err => {
        alert(err.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  componentDidMount() {
    this.authenticateChild();
    this.watchCurrentLocation();
    connectSocket();
    this.startBackgroundLocation();
    this.subscription = DeviceEventEmitter.addListener(
      NativeModules.LocationManager.JS_LOCATION_EVENT_NAME,
      async LocationCoordinates => {
        const shortId = await AsyncStorage.getItem('shortId');
        LocationCoordinates.shortId = shortId;
        sendLocation(LocationCoordinates);
      },
    );
  }
  render() {
    const {child, location} = this.state;
    if (!child) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 30}}>{child.name}</Text>

            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: child.authorized ? '#7ddd71' : '#909090',
                borderRadius: 20,
                marginBottom: 15,
                marginLeft: 3,
                borderColor: 'black',
              }}
            />
          </View>
        </View>
        <MapView
          style={{
            width: Dimensions.get('window').width,
            flex: 1,
          }}
          initialRegion={{
            ...this.mapPolygon()[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Polygon coordinates={this.mapPolygon()} />

          {location && <Marker coordinate={location} />}
        </MapView>
      </View>
    );
  }
}
export default withLocationPermissions(ChildScreen);
