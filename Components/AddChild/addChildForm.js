import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Avatar} from 'react-native-elements';
import PolygonSelector from './ploygonSelector';
class AddChidForm extends React.Component {
  render() {
    return (
      <View>
        <View style={{alignItems: 'center', marginTop: 3}}>
          <Avatar icon={{name: 'user'}} rounded size="xlarge" showEditButton />
        </View>
        <View>
          <Input label="Name" placeholder="Enter name here" />
        </View>
        <View>
          <PolygonSelector />
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  drawPolygon: {
    marginTop: 10,
    marginBottom: 10,
  },
});
module.exports = AddChidForm;
