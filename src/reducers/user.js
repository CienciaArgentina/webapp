const defaultState = {
	isLogged: false,
	user_data: false,
	isCreatingProfile: false
}

const userReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'SET_LOGGED':
			return {...state,
				isLogged: action.isLogged
			};
		case 'SET_USER_DATA':
			return {
				...state,
				user_data: action.user_data
			}
		case 'SET_CREATING_PROFILE':
			return {
				...state,
				isCreatingProfile: action.isCreatingProfile
			}
		default:
			return state
	}
}

export default userReducer