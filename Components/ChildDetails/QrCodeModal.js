import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  TouchableHighlight,
  ToastAndroid,
  Clipboard,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrModal = ({isOpen, closeModal, childId}) => {
  const copyChildId = () => {
    Clipboard.setString(childId);
    ToastAndroid.show('Copied', ToastAndroid.BOTTOM);
  };
  return (
    <Modal transparent={true} animated={true} visible={isOpen}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 300,
            justifyContent: 'flex-end',
          }}>
          <View style={{alignItems: 'center', padding: 10}}>
            <QRCode size={200} value={childId} />
          </View>
          <View style={{alignItems: 'center', padding: 10, fontSize: 22}}>
            <TouchableHighlight onPress={copyChildId}>
              <Text>{childId}</Text>
            </TouchableHighlight>
          </View>
          <View>
            <Button onPress={closeModal} title="OK" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QrModal;
