import {AUTHENTICATED, AUTHENTICATING, UNAUTHENTICATED} from '../actionTypes';
import axios from 'axios';
import {baseUrl} from '../../Shared/constants';

export const logIn = ({email, password}) => async dispatch => {
  try {
    dispatch(authenticationLoading());
    const resp = await axios.post(`${baseUrl}api/v1/users/auth/signIn`, {
      email,
      password,
    });
    dispatch(authenticationSuccessful(resp.data.user));
  } catch (err) {
    dispatch(authenticationFailed());
    if (err.response) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    } else {
      alert(err.message);
    }
  }
};

export const signUp = ({
  email,
  password,
  firstName,
  lastName,
}) => async dispatch => {
  try {
    dispatch(authenticationLoading());
    const resp = await axios.post(`${baseUrl}api/v1/users/auth/signUp`, {
      email,
      password,
      firstName,
      lastName,
    });
    dispatch(authenticationSuccessful(resp.data.user));
  } catch (err) {
    dispatch(authenticationFailed());
    if (err.response) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    } else {
      alert(err.message);
    }
  }
};

const authenticationLoading = () => ({type: AUTHENTICATING});
const authenticationFailed = () => ({type: UNAUTHENTICATED});
const authenticationSuccessful = user => ({type: AUTHENTICATED, user});
