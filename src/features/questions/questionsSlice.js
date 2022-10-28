/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to questions.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api/Request";

export const DIFICULTY_LEVEL = {
  EASY:1,
  MODERATE:2,
  HARD:3
}

const initialState = {
  questions: [],
  selectedQuestion:null,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload.questions;
    },
    setSelectedQuestion: (state,action) => {
      state.selectedQuestion = action.payload.question
    }
  },
});

export const { setQuestions, setSelectedQuestion } = questionsSlice.actions;

export const fetchQuestions = createAsyncThunk(
  `questions/get`,
  async ({ params }, { dispatch }) => {
    // No Authetnicated user found
    try {
      const response = await api.get('/get-type')
      console.log('response')
      console.log(response.data)

      dispatch(
        setQuestions({
          questions:response.data
        })
      );
    } catch (err) {
      // TODO: Show error toast
    }
  }
);

export const createQuestion = createAsyncThunk(
  `questions/create`,
  async ({question}, {dispatch}) => {
    try {
      const newQuestion = question
      await api.post('/add-type',newQuestion)
      return true
    } catch (err) {
      console.log(err)
    }
  }
)

export default questionsSlice.reducer