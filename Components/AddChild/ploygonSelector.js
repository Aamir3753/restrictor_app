import React from 'react';
import {Dimensions, Text, PermissionsAndroid, View} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import shortId from 'shortid';
import Geolocation from 'react-native-geolocation-service';

class PloygonSelector extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    selectedPoints: [],
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
            location.coords.identifier = shortId.generate();
            this.setState({
              location: location.coords,
              selectedPoints: [location.coords],
            });
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

  onMarkerDragEnd = (location, m) => {
    location.identifier = m.identifier;
    const markers = this.state.selectedPoints.filter(
      loc => loc.identifier !== m.identifier,
    );
    this.setState(
      {
        selectedPoints: [...markers, location],
      },
      () => {
        this.props.polygonHandler(this.state.selectedPoints);
      },
    );
  };
  addNewMarker = location => {
    location.identifier = shortId.generate();
    this.setState(
      {
        selectedPoints: [...this.state.selectedPoints, location],
      },
      () => {
        this.props.polygonHandler(this.state.selectedPoints);
      },
    );
  };
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
        onPress={selectedLocation =>
          this.addNewMarker(selectedLocation.nativeEvent.coordinate)
        }
        initialRegion={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Polygon coordinates={this.state.selectedPoints} />
        {this.state.selectedPoints.map(m => (
          <Marker
            draggable
            onDragEnd={selectedLocation => {
              this.onMarkerDragEnd(selectedLocation.nativeEvent.coordinate, m);
            }}
            key={m.identifier}
            coordinate={m}
          />
        ))}
      </MapView>
    );
  }
}

export default PloygonSelector;
