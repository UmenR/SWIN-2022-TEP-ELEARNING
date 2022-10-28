/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to quizzes.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/Request";




const initialState = {
  quizzes: [],
  selectedQuiz:null,
  selectedGameQuiz: null,
};

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setSelectedGameQuiz: (state, action) => {
      state.selectedGameQuiz = action.payload.selectedGameQuiz;
    },
    setSelectedQuiz: (state, action) => {
      state.selectedQuiz = action.payload.selectedQuiz;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload.quizzes;
    },

  },
});

export const { setSelectedGameQuiz, setQuizzes, setSelectedQuiz } = quizzesSlice.actions;

export const fetchQuizzes = createAsyncThunk(
  `quizzes/get`,
  async ({_}, { dispatch, getState }) => {
    // No Authetnicated user found
      try {
        const result = await api.get('/get-mockQuiz')
        console.log(result)
        dispatch(
          setQuizzes({
            quizzes: result.data,
          })
        );
        return true;
      } catch (err) {
        // TODO: Show error toast
        console.log(err)
      }
  }
);

export const addQuiz = createAsyncThunk(
  `quizzes/add`,
  async ({newQuiz}, { dispatch, getState }) => {
    // No Authetnicated user found
      try {
        await api.post('/add-mockQuiz',newQuiz)
      } catch (err) {
        console.log(err)
      }
  }
);

export default quizzesSlice.reducer;
