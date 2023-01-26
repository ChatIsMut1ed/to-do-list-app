export const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LOGGED_IN_USER':
      localStorage.setItem('auth', JSON.stringify(action.user));
      return {
        user: action.user,
      };
    case 'REMOVE_LOGGED_IN_USER':
      localStorage.removeItem('auth');
      return null;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
