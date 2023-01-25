export const authReducer = (state, action) => {
	switch (action.type) {
		case "ADD_LOGGED_IN_USER":
			return {
				...state,
				isLoggedIn: true,
				user: action.loggedInUser || state.user,
				// normalCoins: action.loggedInUser.normalCoins,
			};
		case "ADD_ACTIVE_GAME":
			return {
				...state,
				activeGame: action.activeGame,
			};
		case "REMOVE_LOGGED_IN_USER":
			return {
				...state,
				isLoggedIn: false,
			};
		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
};
