import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    // case 'RESET':
    //   return Object.assign({}, state, {
    //     count: exampleInitialState.count
    //   })
    default:
      return state
  }
}

// ACTIONS

// export const resetCount = () => dispatch => {
//   return dispatch({ type: 'RESET })
// }

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}