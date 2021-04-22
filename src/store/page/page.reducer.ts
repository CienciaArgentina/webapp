import { HYDRATE } from "next-redux-wrapper";
import { ReduxHydrate } from '../index'

export type PageReducerState = {
	testVar: string
}

const defaultState:PageReducerState = {
	testVar: 'test'
}


export const pageReducer = (state:PageReducerState = defaultState, action:ReduxHydrate) => {
	switch (action.type) {
		case HYDRATE:
            return {...state, ...action.payload.page};
		default:
			return state
	}
}