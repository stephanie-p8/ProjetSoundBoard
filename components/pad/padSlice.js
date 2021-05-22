import { createSlice } from "@reduxjs/toolkit";

const initPad = (n_pad) => {
  let pad = [];
  for (let i = 0; i < n_pad; i++) {
    pad[i] = { id: i, sampleId: undefined };
  }
  return pad;
};

export const padSlice = createSlice({
  name: "pad",
  initialState: initPad(6),
  reducers: {
    changeSource: (state, action) => {
      return state.map((item) =>
        item.id == action.payload.id
          ? { ...item, sampleId: action.payload.sampleId }
          : item
      );
    },
  },
});

export const { changeSource } = padSlice.actions;
export default padSlice.reducer;

export const padSelector = (state) => {
  return state.pad.map((item) => {
    let url = "";

    for (let sample of state.library) {
      if (sample.id == item.sampleId) {
        url = sample.url;
        break;
      }
    }
    return { ...item, url: url };
  });
};
