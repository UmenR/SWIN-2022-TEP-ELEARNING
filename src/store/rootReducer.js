import { combineReducers } from '@reduxjs/toolkit'
import authenticationSlice from './authentication/authenticationSlice'
import counterSlice from './counterSlice'


const combinedReducer = combineReducers({
    default:counterSlice,
    authentication:authenticationSlice
})

function rootReducer(state, action) {
    return combinedReducer(state, action)
  }

export default rootReducer