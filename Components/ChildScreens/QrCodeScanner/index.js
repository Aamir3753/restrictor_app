import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import {Input} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {connect} from 'react-redux';
import {childAuthentication} from '../../../Redux/ActionCreaters/authentication';
import Axios from 'axios';
import {baseUrl} from '../../../Shared/constants';
class QrScanner extends Component {
  state = {
    childId: '',
    isLoading: false,
  };
  onSuccess = e => {
    this.setState({childId: e.data});
  };

  authenticateChild = async () => {
    try {
      this.setState({isLoading: true});
      const resp = await Axios.post(
        baseUrl + 'api/v1/childs/authenticateChild',
        {
          shortId: this.state.childId,
        },
      );
      await AsyncStorage.setItem('shortId', resp.data.child.shortId);
      this.props.dispatch(childAuthentication());
    } catch (err) {
      this.setState({isLoading: false});
      if (err.response) {
        alert(err.response.data.message);
        return;
      }
      alert(err.message);
    }
  };
  onChange = childId => this.setState({childId});
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View />
        <QRCodeScanner onRead={this.onSuccess} />
        <View>
          <Input
            onChangeText={this.onChange}
            containerStyle={{
              backgroundColor: 'white',
              alignItems: 'stretch',
            }}
            value={this.state.childId}
            inputStyle={{
              textAlign: 'center',
            }}
            placeholder="Enter Key"
          />
        </View>
        <View>
          <Button
            loading={this.state.isLoading}
            onPress={this.authenticateChild}
            title="Authenticate"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default connect()(QrScanner);
