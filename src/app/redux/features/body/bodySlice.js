import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  currentEmail: "",
};

export const counterSlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    // here i want to get the user email
    setEmail: (state, action) => {
      console.log(action.payload);
      state.currentEmail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setEmail } =
  counterSlice.actions;

export default counterSlice.reducer;
