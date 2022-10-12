import { combineReducers } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'


const combinedReducer = combineReducers({
    default:counterSlice
})

function rootReducer(state, action) {
    return combinedReducer(state, action)
  }

export default rootReducer