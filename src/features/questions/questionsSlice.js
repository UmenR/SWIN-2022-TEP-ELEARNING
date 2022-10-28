/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to questions.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { wait } from "../../utils/miscUtils";
import { api } from "../../api/Request";

export const DIFICULTY_LEVEL = {
  EASY:1,
  MODERATE:2,
  HARD:3
}

export const MOCK_QUESTIONS = [
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
    solutions: [
      {
        id: 3,
        text: 4,
      },
    ],
    dificulty: DIFICULTY_LEVEL.EASY
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
    solutions: [
      {
        id: 2,
        text: 3,
      },
    ],
    dificulty: DIFICULTY_LEVEL.MODERATE 
  },
  {
    id: 3,
    text: "what is 4+1",
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
    solutions: [
      {
        id: 4,
        text: 5,
      },
    ],
    dificulty: DIFICULTY_LEVEL.MODERATE 
  },
];

export const MOCK_QUESTIONS2 = [
  {
    id: 4,
    text: "what is 10+1",
    answers: [
      {
        id: 1,
        text: 11,
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
    solutions: [
      {
        id: 1,
        text: 11,
      },
    ],
    dificulty: DIFICULTY_LEVEL.MODERATE 
  },
  {
    id: 4,
    text: "what is 12+1",
    answers: [
      {
        id: 1,
        text: 13,
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
    solutions: [
      {
        id: 1,
        text: 13,
      },
    ],
    dificulty: DIFICULTY_LEVEL.MODERATE 
  },
  {
    id: 4,
    text: "what is 20+1",
    answers: [
      {
        id: 1,
        text: 21,
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
    solutions: [
      {
        id: 1,
        text: 21,
      },
    ],
    dificulty: DIFICULTY_LEVEL.MODERATE 
  },
]


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
      // TODO: hookup actual API call here & read from params passed
      // await api.post()
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
      // console.log(`--- new question`)
      // console.log(newQuestion)
      await api.post('/add-type',newQuestion)
      return true
    } catch (err) {
      console.log(err)
    }
  }
)

export default questionsSlice.reducer