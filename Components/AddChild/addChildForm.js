import React from 'react';
import {StyleSheet, View, Picker} from 'react-native';
import {Input, Avatar} from 'react-native-elements';
import PolygonSelector from './ploygonSelector';
import ImagePicker from 'react-native-image-picker';

class AddChidForm extends React.Component {
  state = {
    avatarSource: null,
  };
  options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  showImagePicker = () => {
    ImagePicker.showImagePicker(this.options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.setState(
          {
            avatarSource: source,
          },
          () =>
            this.props.formHandler(
              undefined,
              'data:image/jpeg;base64,' + response.data,
            ),
        );
      }
    });
  };

  render() {
    return (
      <View>
        <View style={{alignItems: 'center', marginTop: 3}}>
          <Avatar
            icon={{name: 'user',type:"antdesign"}}
            imageProps={{source: this.state.avatarSource}}
            onEditPress={this.showImagePicker}
            rounded
            size="xlarge"
            showEditButton
          />
        </View>
        <View>
          <Input
            label="Name"
            onChangeText={name => {
              this.props.formHandler(name);
            }}
            placeholder="Enter name here"
          />
        </View>
        <View>
          <PolygonSelector polygonHandler={this.props.polygonHandler} />
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
