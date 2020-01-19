const defaultState = {
	pageLoading: false
}

const pageReducer = (state = defaultState, action) => {
	switch(action.type) {
		case 'SET_PAGE_LOADING':
			return {
				...state,
				pageLoading: action.loading
			}
		default:
			return state;
	}
}

export default pageReducer