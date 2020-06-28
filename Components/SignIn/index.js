import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Input, Button, Icon, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {logIn as sigInActionCreater} from '../../Redux/ActionCreaters/authentication';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };
  onTextChangeHandler = (name, value) => {
    this.setState({[name]: value});
  };
  submitLoginData = () => {
    const {email, password} = this.state;
    this.props.dispatch(sigInActionCreater({email, password}));
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
          <Icon name="qrcode-scan" size={30} type="material-community" />
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
            // onPress={() => this.props.navigation.navigate('Home')}
            onPress={this.submitLoginData}
            title="LOGIN"
          />
          <TouchableHighlight>
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
