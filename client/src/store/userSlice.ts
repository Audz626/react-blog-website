import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  //   value: string;
  user: {
    id: string;
    name: string;
    role: string;
    token: string;
  };
}

const initialState: CounterState = {
  //   value: "",
  user: {
    id: "",
    name: "",
    role: "",
    token: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login: (state) => {
    //   state.value = "login";
    // },
    logout: (state) => {
      state.user = {
        id: "",
        name: "",
        role: "",
        token: "",
      };
      localStorage.clear();
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    loginStore: (
      state,
      action: PayloadAction<{id:string; name: string; role: string; token: string }>
    ) => {
      // Update the state with the payload from loginStore
      state.user = {
        id:action.payload.id,
        name: action.payload.name,
        role: action.payload.role,
        token: action.payload.token,
      };
    },
  },
});

// Action creators are generated for each case reducer function  login, logout, incrementByAmount, loginStore
export const { loginStore, logout } = userSlice.actions;

export default userSlice.reducer;
