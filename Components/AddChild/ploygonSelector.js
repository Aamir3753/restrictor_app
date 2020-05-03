import React from 'react';
import {Dimensions, Text, PermissionsAndroid, View} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

class PloygonSelector extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    seletedPoints: [],
  };
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Restrictor',
          message: 'Restrictor wants access your location ',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        const err = new Error('Perimision Denied');
        throw err;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    this.requestLocationPermission()
      .then(() => {
        Geolocation.getCurrentPosition(
          location => {
            this.setState({location: location.coords});
          },
          err => {
            alert(err.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      })
      .catch(err => {
        alert(err.message);
      });
  }
  render() {
    if (!this.state.location) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: 300,
          marginTop: 5,
          flex: 1,
        }}
        initialRegion={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable
          coordinate={{
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
          }}
          title="Current Location"
        />
      </MapView>
    );
  }
}

export default PloygonSelector;
