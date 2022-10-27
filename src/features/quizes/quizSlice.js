/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to quizzes.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wait } from "../../utils/miscUtils";

import { MOCK_QUESTIONS, MOCK_QUESTIONS2 } from "../questions/questionsSlice";

const MOCK_QUIZZES = [
  {
    id: 1,
    description: "test quiz",
    title:"Addition practice - 1",
    questions: MOCK_QUESTIONS,
  },
  {
    id: 2,
    description: "test quiz 2",
    title:"Addition practice - 2",
    questions: MOCK_QUESTIONS2,
  }
];

const initialState = {
  quizzes: [],
  selectedGameQuiz: null,
};

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setSelectedGameQuiz: (state, action) => {
      state.selectedGameQuiz = action.payload.selectedGameQuiz;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload.quizzes;
    },
  },
});

export const { setSelectedGameQuiz, setQuizzes } = quizzesSlice.actions;

export const fetchQuizzes = createAsyncThunk(
  `quizzes/get`,
  async ({_}, { dispatch, getState }) => {
    // No Authetnicated user found
      try {
        // TODO: hookup actual API call here & read from params passed
        // await api.post()
        await wait(1500);
        dispatch(
          setQuizzes({
            quizzes: MOCK_QUIZZES,
          })
        );
        return true;
      } catch (err) {
        // TODO: Show error toast
      }
  }
);

export default quizzesSlice.reducer;
