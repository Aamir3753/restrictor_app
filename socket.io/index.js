import socketIo from 'socket.io-client';
import {baseUrl} from '../Shared/constants';
let socket = null;
export default (connectSocket = () => {
  socket = socketIo(baseUrl, {
    transports: ['websocket'],
    jsonp: false,
  });
  socket.connect();
});

export const sendLocation = data => {
  socket.emit('LOCATION_RECEIVED', data);
};

export const locationUpdate = (eventName, cb) => {
  socket.on(eventName, cb);
};
