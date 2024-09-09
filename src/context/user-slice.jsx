import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: JSON.parse(localStorage.getItem("users")) || [],
  },
  reducers: {
    addToUsers(state, action) {
      state.value = [...state.value, action.payload];
      localStorage.setItem("users", JSON.stringify(state.value));
    },
    removeFromUsers(state, action) {
      state.value = state.value.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.value));
    },
    updateToUser(state, action) {
      const index = state.value.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
        localStorage.setItem("users", JSON.stringify(state.value));
      }
    },
  },
});

export const { addToUsers, removeFromUsers, updateToUser } = userSlice.actions;
export default userSlice.reducer;
