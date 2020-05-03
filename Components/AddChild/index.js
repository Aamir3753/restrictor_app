import React from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import AddChildForm from './addChildForm';

const AddChild = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <AddChildForm />
      </ScrollView>
      <View style={{height: 45, flexDirection: 'column-reverse'}}>
        <Button buttonStyle={{borderRadius: 0}} title="Save" />
      </View>
    </View>
  );
};

export default AddChild;
