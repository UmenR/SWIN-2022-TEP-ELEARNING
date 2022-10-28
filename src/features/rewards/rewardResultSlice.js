/**
 * This file creates the portion of the redux store responsible for
 * managing the state related to rewards and scores.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api/Request";

const initialState = {
  totalStars: 0,
  totalScore: 0,
  scores: {},
};

export const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setScoresAndStars: (state, action) => {
      state.totalStars = action.payload.totalStars;
      state.totalScore = action.payload.totalScore;
      state.scores = action.payload.completed;
    },
  },
});

export const postScore = createAsyncThunk(
  `rewards/save`,
  async ({ params }, { getState, dispatch }) => {
    const state = getState();
    const studentID = state.authentication?.userFirstName;
    console.log(` data ${JSON.stringify(params)}`);
    const data = {
      studentID,
      quiz: params.quiz,
      quizID: params.quizID,
    };
    try {
      await api.post("/add-leader", data);
      const response = await api.get("/get-leader");
      const currentUserData = response.data.find(
        (element) => element._id === studentID
      );
      dispatch(
        setScoresAndStars({
          totalStars: currentUserData.total_stars,
          totalScore: currentUserData.total_score,
          scores: currentUserData.completed,
        })
      );
    } catch (err) {
      // TODO: Show error toast
    }
  }
);

export const getScore = createAsyncThunk(
  `rewards/fetch`,
  async ({ studentID }, { getState, dispatch }) => {
    try {
      const response = await api.get("/get-leader");
      const currentUserData = response.data.find(
        (element) => element._id === studentID
      );
      dispatch(
        setScoresAndStars({
          totalStars: currentUserData.total_stars,
          totalScore: currentUserData.total_score,
          scores: currentUserData.completed,
        })
      );
    } catch (err) {
      // TODO: Show error toast
    }
  }
);

export const { setScoresAndStars } = rewardSlice.actions;

export default rewardSlice.reducer;
