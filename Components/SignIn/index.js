import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Input, Button, Icon, Text} from 'react-native-elements';

class SignIn extends React.Component {
  render() {
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
          />
          <Input
            leftIcon={<Icon name="lock" type="material-community" />}
            secureTextEntry={true}
            placeholder="Password"
            textContentType="password"
          />
          <Button
            containerStyle={Styles.loginButton}
            onPress={() => this.props.navigation.navigate('Home')}
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
            <TouchableHighlight>
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

export default SignIn;
