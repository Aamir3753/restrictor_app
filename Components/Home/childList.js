import React from 'react';
import {FlatList, View, ImageBackground} from 'react-native';
import {ListItem} from 'react-native-elements';

const childs = [
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  //   {
  //     name: 'Aamir',
  //     image: '../../assets/image.png',
  //   },
  // {
  //   name: 'Aamir',
  //   image: '../../assets/image.png',
  // },
];

const Childs = () => {
  if (childs.length === 0) {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/empty-background.png')}
      />
    );
  }
  return (
    <View>
      <FlatList
        data={childs}
        renderItem={({item}) => {
          return (
            <ListItem
              title={item.name}
              leftAvatar={{source: require('../../assets/image.png')}}
              chevron
              bottomDivider
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Childs;
