/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to quizzes.
 */

 import { createSlice } from "@reduxjs/toolkit";

import { MOCK_QUESTIONS } from "../questions/questionsSlice";

const MOCK_QUIZZES = [
    {
        id:1,
        description:'test quiz',
        questions: MOCK_QUESTIONS
    }
]

const initialState = {
    quizes:MOCK_QUIZZES,
    selectedGameQuiz:MOCK_QUIZZES[0],
}

export const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setSelectedGameQuiz: (state, action) => {
        state.selectedGameQuiz = action.payload.selectedGameQuiz;
      },
    },
  });

// TODO: Add thunk for retrieving quizzes from api.

export const {setSelectedQuiz} = quizzesSlice.actions

export default quizzesSlice.reducer