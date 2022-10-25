import { combineReducers } from '@reduxjs/toolkit'

import authenticationSlice from './authentication/authenticationSlice'
import counterSlice from './counterSlice'
import questionsSlice from '../features/questions/questionsSlice'
import quizSlice from '../features/quizes/quizSlice'


const combinedReducer = combineReducers({
    default:counterSlice,
    authentication:authenticationSlice,
    questions:questionsSlice,
    quizzes:quizSlice,
})

function rootReducer(state, action) {
    return combinedReducer(state, action)
  }

export default rootReducer