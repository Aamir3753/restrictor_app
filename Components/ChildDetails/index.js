import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
class ChildDetails extends React.Component {
  render() {
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
            <Text style={{fontSize: 30}}>Aamir</Text>

            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: '#7ddd71',
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
          // onPress={selectedLocation =>
          //   this.addNewMarker(selectedLocation.nativeEvent.coordinate)
          // }
          initialRegion={{
            latitude: 31.406503286990883,
            longitude: 73.07619653642178,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* <Polygon coordinates={this.state.selectedPoints} />
        {this.state.selectedPoints.map(m => (
          <Marker
          draggable
          onDragEnd={selected{Marker, Polygon} Location => {
            this.onMarkerDragEnd(selectedLocation.nativeEvent.coordinate, m);
          }}
          key={m.identifier}
          coordinate={m}
          />
        ))} */}
        </MapView>
      </View>
    );
  }
}
export default ChildDetails;
