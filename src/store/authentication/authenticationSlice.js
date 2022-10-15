import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api/Request";
import { wait } from "../../utils/miscUtils";

export const USER_AUTH_TYPE = {
  none: 0,
  teacher: 1,
  student: 2,
};

const initialState = {
  authStatus: USER_AUTH_TYPE.none,
  userFirstName: "",
  userId: null,
};

export const authetnciationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = action.payload.authStatus;
      state.userFirstName = action.payload.user.firstName;
      state.userId = action.payload.user.id;
    },
  },
});

const { login } = authetnciationSlice.actions;

export const loginUser = createAsyncThunk(
  `authentication/login`,
  async ({ username, password, userType }, { dispatch, getState }) => {
    const state = getState();
    // No Authetnicated user found
    if (!state.isAuthenticated) {
      try {
        // TODO: hookup actual API call here & read from params passed
        // await api.post()
        await wait(1500);
        dispatch(
          login({
            authStatus: 1,
            user: {
              firstName: "jane",
              userId: "jane@doe.com",
            },
          })
        );
      } catch (err) {
        // TODO: Show error toast
      }
    }
  }
);

export default authetnciationSlice.reducer;
