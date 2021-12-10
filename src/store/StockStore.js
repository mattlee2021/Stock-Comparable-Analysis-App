import { createSlice, configureStore } from "@reduxjs/toolkit";

const tickerDataSlice = createSlice({
  name: "Ticker",
  initialState: {
    value: "",
  },
  reducers: {
    setTicker(state, action) {
      state.value = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { ticker: tickerDataSlice.reducer },
});

export const tickerActions = tickerDataSlice.actions;

export default store;
