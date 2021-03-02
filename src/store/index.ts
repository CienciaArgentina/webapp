import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './user/user.reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { UserReducerState } from './user/user.types';
import { pageReducer, PageReducerState } from './page/page.reducer';

export type StoreState = {
	user: UserReducerState,
	page: PageReducerState
}

export type ReduxHydrate = {
	type: typeof HYDRATE,
	payload: StoreState
}

const rootReducer = combineReducers({
	user: userReducer,
	page: pageReducer,
})

// create a makeStore function
const makeStore: MakeStore<StoreState> = () => createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>

// export an assembled wrapper
export const wrapper = createWrapper<StoreState>(makeStore, {debug: false});