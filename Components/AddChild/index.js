import React from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import AddChildForm from './addChildForm';
import axios from 'axios';
import {baseUrl} from '../../Shared/constants';
import {connect} from 'react-redux';

class AddChild extends React.Component {
  state = {
    name: '',
    image: '',
    polygon: [],
    isLoading: false,
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
  saveChild = async () => {
    this.setState({isLoading: true});
    const url = `${baseUrl}api/v1/users/childs/createChild`;
    let {polygon, name, image} = this.state;
    const token = this.props.Authentication.user.token;
    try {
      polygon = polygon.map(point => [point.longitude, point.latitude]);
      const resp = await axios.post(
        url,
        {
          name,
          polygon: {
            type: 'Polygon',
            coordinates: [polygon],
          },
          // avatar: image,
        },
        {
          headers: {
            Authorization: 'bearer ' + token,
          },
        },
      );
      this.setState({isLoading: false});
      this.props.navigation.navigate('Home');
    } catch (err) {
      this.setState({isLoading: false});
      if (err.response) {
        alert(err.response.data.message);
        return;
      }
      alert(err.message);
    }
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
            loading={this.state.isLoading}
            buttonStyle={{borderRadius: 0}}
            onPress={this.saveChild}
            title="Save"
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = store => ({
  Authentication: store.Authentication,
});
export default connect(mapStateToProps)(AddChild);
