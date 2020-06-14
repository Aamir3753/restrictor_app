import React from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import AddChildForm from './addChildForm';

class AddChild extends React.Component {
  state = {
    name: '',
    image: '',
    polygon: [],
  };
  formHandler = (name, image) => {
    if (name) {
      this.setState({name});
      return;
    }
    this.setState({image});
  };
  polygonHandler = polygon => {
    this.setState({polygon});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <AddChildForm
            polygonHandler={this.polygonHandler}
            formHandler={this.formHandler}
          />
        </ScrollView>
        <View style={{height: 45, flexDirection: 'column-reverse'}}>
          <Button
            buttonStyle={{borderRadius: 0}}
            onPress={() => {
              alert(this.state);
            }}
            title="Save"
          />
        </View>
      </View>
    );
  }
}

export default AddChild;
