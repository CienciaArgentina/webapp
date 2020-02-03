import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import pageReducer from './src/reducers/page'
import userReducer from './src/reducers/user'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/reducers/root-saga'

function configureStore(preloadedState, {isServer, req = null}) {
	const sagaMiddleware = createSagaMiddleware()
	const store = createStore(
		combineReducers({
			user: userReducer,
			page: pageReducer
		}),
		preloadedState,
    	composeWithDevTools(applyMiddleware(sagaMiddleware))
	)
	if (req || !isServer) {
		store.sagaTask = sagaMiddleware.run(rootSaga)
	}
	
	return store
}

export default configureStore