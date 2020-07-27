import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
class ChildScreen extends React.Component {
  state = {
    child: null,
  };
  mapPolygon = () => {
    const {child} = this.state;
    return child.location.polygon.coordinates[0].map(points => ({
      latitude: points[1],
      longitude: points[0],
    }));
  };
  render() {
    const {child} = this.state;
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
                backgroundColor:
                  child.authorized && child.location.active
                    ? '#7ddd71'
                    : '#909090',
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
          }}>
          <Polygon coordinates={this.mapPolygon()} />

          {child.location.currentLocation.coordinates.length !== 0 && (
            <Marker
              coordinates={{
                longitude: child.location.currentLocation.coordinates[0],
                latitude: child.location.currentLocation.coordinates[1],
              }}
            />
          )}
        </MapView>
      </View>
    );
  }
}
export default ChildScreen;
