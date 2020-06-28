import React from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {signUp as signUpActionCreater} from '../../Redux/ActionCreaters/authentication';

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  inputHandler = (feild, value) => {
    this.setState({[feild]: value});
  };

  formHandler = () => {
    const {email, password, firstName, lastName} = this.state;
    // let isValid = true;
    // let errMessage = '';
    // if (this.state.name.length < 4) {
    //   let isValid = false;
    //   let errMessage = 'Please Enter a valid name';
    // }else if(this.state.password.length<8){

    // }
    this.props.dispatch(
      signUpActionCreater({email, password, firstName, lastName}),
    );
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
      <View style={Styles.MainContainer}>
        <ScrollView style={{flex: 1}}>
          <Input
            autoFocus={true}
            onChangeText={text => this.inputHandler('firstName', text)}
            leftIcon={<Icon name="user" type="material-community" />}
            placeholder="Aamir"
          />
          <Input
            autoFocus={true}
            onChangeText={text => this.inputHandler('lastName', text)}
            leftIcon={<Icon name="user" type="material-community" />}
            placeholder="Shabir"
          />
          <Input
            onChangeText={text => this.inputHandler('email', text)}
            leftIcon={<Icon name="email" type="material-community" />}
            keyboardType="email-address"
            placeholder="email@example.com"
            textContentType="emailAddress"
          />
          <Input
            onChangeText={text => this.inputHandler('password', text)}
            leftIcon={<Icon name="lock" type="material-community" />}
            secureTextEntry={true}
            placeholder="Password"
            textContentType="password"
          />
          <Input
            onChangeText={text => this.inputHandler('confirmPassword', text)}
            leftIcon={<Icon name="lock" type="material-community" />}
            secureTextEntry={true}
            placeholder="Confirm Password"
            textContentType="password"
          />
        </ScrollView>
        <Button onPress={this.formHandler} title="Let's Go" />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
});

const mapStateToProps = store => ({
  Authentication: store.Authentication,
});
export default connect(mapStateToProps)(SignUp);
