import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
  editp: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    updateEditp(state, action) {
      state.editp = action.payload;
    },
  },
});

export default postSlice.reducer;

export function SetPosts(post) {
  return (dispatch, getState) => {
    dispatch(postSlice.actions.getPosts(post));
  };
}

export function UpdateEditp(val) {
  return (dispatch, getState) => {
    dispatch(postSlice.actions.updateEditp(val));
  };
}
