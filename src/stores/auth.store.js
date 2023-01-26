import MakeStore from './makeStore';
import { authReducer } from '../reducers/auth.reducer';

const user = null;

const [AuthProvider, useAuthDispatch, useAuthStore] = MakeStore(authReducer, user, 'AuthStore');

export { AuthProvider, useAuthDispatch, useAuthStore };
