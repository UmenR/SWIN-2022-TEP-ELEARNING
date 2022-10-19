/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to questions.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { wait } from "../../utils/miscUtils";

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "what is 2+2",
    answers: [
      {
        id: 1,
        text: 2,
      },
      {
        id: 2,
        text: 3,
      },
      {
        id: 3,
        text: 4,
      },
      {
        id: 4,
        text: 5,
      },
    ],
  },
  {
    id: 2,
    text: "what is 2+1",
    answers: [
      {
        id: 1,
        text: 1,
      },
      {
        id: 2,
        text: 3,
      },
      {
        id: 3,
        text: 4,
      },
      {
        id: 4,
        text: 5,
      },
    ],
  },
];

const initialState = {
  questions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload.questions;
    },
  },
});

const { setQuestions } = questionsSlice.actions;

export const fetchQuestions = createAsyncThunk(
  `questions/get`,
  async ({ params }, { dispatch }) => {
    // No Authetnicated user found
    try {
      // TODO: hookup actual API call here & read from params passed
      // await api.post()
      await wait(1500);
      dispatch(
        setQuestions({
          questions:MOCK_QUESTIONS
        })
      );
    } catch (err) {
      // TODO: Show error toast
    }
  }
);

export default questionsSlice.reducer