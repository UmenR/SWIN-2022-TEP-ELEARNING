/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to rewards and scores.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { wait } from "../../utils/miscUtils";

const initialState = {
  totalStars: 0,
  scores: {},
};

// studentID1:{
//   rank:1,
//   totalStars: 4,
//   totalScore: 15,
//   completed:{
//     quizID1: {
//       score: 10,
//       questions: 20,
//       correct: 10,
//       incorrect: 10,
//       stars: 2,
//     },
//     quizID2: {
//       score: 5,
//       questions: 10,
//       correct: 5,
//       incorrect: 5,
//       stars: 2,
//     },
// }
// }

// studentID1:{
//     1: {
//       score: 10,
//       questions: 20,
//       correct: 10,
//       incorrect: 10,
//       stars: 2,
//     }
// }
// }


export const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setScoresAndStars: (state, action) => {
      console.log(`--- reducer, ${JSON.stringify(action.payload)}`);
      const quizId = action.payload.quizId;

      // Make sure only to update if the result is higher than prev attempt
      if (
        (state.scores[quizId] &&
          state.scores[quizId].score < action.payload.game.score) ||
        !state.scores[quizId]
      ) {
        console.log(`--- hit`)
        const previousStars = state.scores[quizId]?.stars || 0;
        state.scores = { ...state.scores, [quizId]: action.payload.game };
        state.totalStars = 
          state.totalStars - previousStars + action.payload.game.stars;
      }
    },
  },
});

export const postScore = createAsyncThunk(
  `rewards/save`,
  async ({ params }, { dispatch }) => {
    // No Authetnicated user found
    console.log(`--- params ${JSON.stringify(params)}`);
    try {
      // TODO: hookup actual API call here & read from params passed
      // await api.post()
      await wait(1500);
      dispatch(
        setScoresAndStars({
          game: params.game,
          quizId: 1,
        })
      );
    } catch (err) {
      // TODO: Show error toast
    }
  }
);

export const { setScoresAndStars } = rewardSlice.actions;

export default rewardSlice.reducer;
