import React from 'react';
import {Dimensions, View, Text, TouchableHighlight} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import QrModal from './QrCodeModal';
class ChildDetails extends React.Component {
  state = {
    isModalOpen: false,
  };
  openModal = () => this.setState({isModalOpen: true});
  closeModal = () => this.setState({isModalOpen: false});
  mapPolygon = () => {
    const {child} = this.props.route.params;
    return child.location.polygon.coordinates[0].map(points => ({
      latitude: points[1],
      longitude: points[0],
    }));
  };
  render() {
    const {child} = this.props.route.params;
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
            <TouchableHighlight onPress={this.openModal}>
              <Text style={{fontSize: 30}}>{child.name}</Text>
            </TouchableHighlight>

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
          }}
          initialRegion={{
            ...this.mapPolygon()[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
        <QrModal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          childId={child.shortId}
        />
      </View>
    );
  }
}
export default ChildDetails;
