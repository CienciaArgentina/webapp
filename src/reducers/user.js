const defaultState = {
	isLogged: false,
	userData: false,
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
				userData: action.userData
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