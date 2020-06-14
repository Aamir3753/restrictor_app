import React from 'react';
import {View} from 'react-native';
import ChildList from './childList';
import {Button} from 'react-native-elements';

class Home extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ChildList {...this.props} />
        </View>
        <View style={{height: 45, flexDirection: 'column-reverse'}}>
          <Button
            buttonStyle={{borderRadius: 0}}
            onPress={() => this.props.navigation.navigate('AddChild')}
            title="Add New"
          />
        </View>
      </View>
    );
  }
}

export default Home;
