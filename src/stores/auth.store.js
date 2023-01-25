import MakeStore from './makeStore';
import { authReducer } from '../reducers/auth.reducer';

const auth = {
  isLoggedIn: 'loading',
};

const [AuthProvider, useAuthDispatch, useAuthStore] = MakeStore(authReducer, auth, 'AuthStore');

export { AuthProvider, useAuthDispatch, useAuthStore };
