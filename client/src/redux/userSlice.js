import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/data";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("user")) ?? {},
  edit: false,
  post: false,
  notification: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      try {
        localStorage?.removeItem("user");
      } catch (error) {
        console.log(error);
      }
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
    updatePost(state, action) {
      state.post = action.payload;
    },
    setnotification(state, action) {
      state.notification = action.payload;
    },
  },
});
export default userSlice.reducer;

export function UserLogin(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login(user));
  };
}
export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}
export function UpdateProfile(val) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updateProfile(val));
  };
}

export function UpdatePost(val) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updatePost(val));
  };
}

export function Setnotification(val) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.setnotification(val));
  };
}
