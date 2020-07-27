import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';
import {Input, Button, Icon, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import TouchID from 'react-native-touch-id';

import {logIn as sigInActionCreater} from '../../Redux/ActionCreaters/authentication';

const server = DeviceInfo.getBundleId();

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };
  onTextChangeHandler = (name, value) => {
    this.setState({[name]: value});
  };
  submitLoginData = async () => {
    try {
      const {email, password} = this.state;
      this.props.dispatch(sigInActionCreater({email, password}));
      await Keychain.setInternetCredentials(server, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  getCreds = async () => {
    const credentials = await Keychain.getInternetCredentials(server);
    if (credentials) {
      return credentials;
    } else {
      const err = new Error('SignIn first time with Email and Password');
      throw err;
    }
  };
  pressHandler = () => {
    const optionalConfigObject = {
      title: 'Authenticate',
      color: '#e00606',
    };
    TouchID.authenticate('Scan Fingerprint to Signin', optionalConfigObject)
      .then(async () => {
        try {
          const creds = await this.getCreds();
          const {username, password} = creds;
          this.props.dispatch(sigInActionCreater({email: username, password}));
        } catch (err) {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
        }
      })
      .catch(() => {
        ToastAndroid.show('Authentication Failed', ToastAndroid.BOTTOM);
      });
  };
  render() {
    if (this.props.Authentication.isLoading) {
      return (
        <ActivityIndicator
          hidesWhenStopped={true}
          size="large"
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        />
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={Styles.qrIcon}>
          <Icon
            onPress={()=>this.props.navigation.navigate('QrScanner')}
            name="qrcode-scan"
            size={30}
            type="material-community"
          />
        </View>
        <View style={Styles.MainContainer}>
          <Input
            leftIcon={<Icon name="email" type="material-community" />}
            keyboardType="email-address"
            placeholder="email@example.com"
            textContentType="emailAddress"
            onChangeText={text => this.onTextChangeHandler('email', text)}
          />
          <Input
            leftIcon={<Icon name="lock" type="material-community" />}
            secureTextEntry={true}
            placeholder="Password"
            textContentType="password"
            onChangeText={text => this.onTextChangeHandler('password', text)}
          />
          <Button
            containerStyle={Styles.loginButton}
            onPress={this.submitLoginData}
            title="LOGIN"
          />
          <TouchableHighlight onPress={this.pressHandler}>
            <View style={Styles.loginWithtouchId}>
              <Icon name="fingerprint" size={24} type="material-community" />
              <Text style={{fontSize: 14}}>LOGIN WITH TOUCHID</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={Styles.loginFooter}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 5,
            }}>
            <Icon
              name="help-box"
              onPress={() => alert('Need Help')}
              size={24}
              type="material-community"
            />
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{marginRight: 10}}>Create Account!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 20,
    width: 300,
  },
  qrIcon: {
    marginTop: 5,
    marginRight: 10,
    position: 'absolute',
    right: 0,
  },
  loginWithtouchId: {
    marginTop: 10,
    flexDirection: 'row',
  },
  loginFooter: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = store => ({
  Authentication: store.Authentication,
});
export default connect(mapStateToProps)(SignIn);
