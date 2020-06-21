import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  inputHandler = (feild, value) => {
    this.setState({[feild]: value});
  };

  formHandler = () => {
    // let isValid = true;
    // let errMessage = '';
    // if (this.state.name.length < 4) {
    //   let isValid = false;
    //   let errMessage = 'Please Enter a valid name';
    // }else if(this.state.password.length<8){

    // }
    alert(this.state.name);
  };

  render() {
    return (
      <View style={Styles.MainContainer}>
        <View style={{flex: 1}}>
          <Input
            autoFocus={true}
            onChangeText={text => this.inputHandler('name', text)}
            leftIcon={<Icon name="user" type="material-community" />}
            placeholder="Jhon Doe"
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
        </View>
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

export default SignUp;
