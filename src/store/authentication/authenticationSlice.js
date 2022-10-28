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
        const response = await api.get(`/get-creds/${username}`);
        console.log(response.data[0].password)
        console.log(password)
        if (response.data.length < 0) {
          console.log("-- no user");
          return false
        } else if (
          userType === USER_AUTH_TYPE.teacher &&
          response.data[0].password == password
        ) {
          dispatch(
            login({
              authStatus: USER_AUTH_TYPE.teacher,
              user: {
                firstName: username,
                userId: username,
              },
            })
          );
          return true
        } else if(userType === USER_AUTH_TYPE.student){
          dispatch(
            login({
              authStatus: USER_AUTH_TYPE.student,
              user: {
                firstName: username,
                userId: username,
              },
            })
          );
          return true
        }

        return false;
      } catch (err) {
        // TODO: Show error toast
      }
    }
  }
);

export default authetnciationSlice.reducer;
