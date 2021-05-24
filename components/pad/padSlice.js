import { createSlice } from "@reduxjs/toolkit";

/**
 * Initialize the pads array
 * @param {int} n_pad 
 * @returns pad an array of pads
 */
const initPad = (n_pad) => {
  let pad = [];
  for (let i = 0; i < n_pad; i++) {
    pad[i] = { id: i, sampleId: undefined };
  }
  return pad;
};

/**
 * Pad slice  that contain pads state and enable to change source of audio in the pads
 * @see {@link https://redux-toolkit.js.org/api/createSlice | createSlice Redux toolkit }
 */
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

export const { changeSource } = padSlice.actions; //methods
export default padSlice.reducer; //reducer

/**
 * Give an url of audio to each pad
 * @param {state} state slice state
 * @returns item with a new url
 */
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
