import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  isLogged: false,
  username: false,
  email: false,
  rol: false
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    // case 'RESET':
    //   return Object.assign({}, state, {
    //     count: exampleInitialState.count
    //   })
    case 'INITUSER':
      return {...state,
        isLogged: action.data.isLogged,
        username: action.data.username,
        email: action.data.email,
        rol: action.data.rol
      };
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