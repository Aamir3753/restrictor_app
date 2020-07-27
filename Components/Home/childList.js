import React from 'react';
import {FlatList, View, ImageBackground, ActivityIndicator} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
import {baseUrl} from '../../Shared/constants';
import {connect} from 'react-redux';

class Childs extends React.Component {
  state = {
    childs: [],
    isLoading: false,
  };
  getChildList = async () => {
    this.setState({isLoading: true});
    const url = `${baseUrl}api/v1/users/childs/getListOfChilds`;
    const token = this.props.Authentication.user.token;
    try {
      const resp = await axios.get(url, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      });
      console.log(resp.data);
      this.setState({isLoading: false, childs: resp.data.childs});
    } catch (err) {
      this.setState({isLoading: false});
      if (err.response) {
        alert(err.response.data.message);
        return;
      }
      alert(err.message);
    }
  };
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getChildList();
    });
  }
  render() {
    const {childs, isLoading} = this.state;

    if (isLoading) {
      return (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
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
                leftAvatar={{
                  source:
                    item.avatar !== ''
                      ? item.avatar
                      : require('../../assets/image.png'),
                }}
                chevron
                bottomDivider
                onPress={() =>
                  this.props.navigation.navigate('ChildDetails', {child: item})
                }
              />
            );
          }}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  Authentication: store.Authentication,
});
export default connect(mapStateToProps)(Childs);
