import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATING,
  LOGOUT,
} from '../actionTypes';

export default (
  state = {
    isLoading: false,
    user: null,
    isAuthenticated: false,
  },
  action,
) => {
  switch (action.type) {
    case AUTHENTICATING:
      return {isLoading: true, user: null, isAuthenticated: false};
    case AUTHENTICATED:
      return {
        isLoading: false,
        user: action.user,
        isAuthenticated: true,
      };
    case UNAUTHENTICATED:
      return {
        isLoading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {isLoading: false, user: null, isAuthenticated: false};
    default:
      return state;
  }
};
