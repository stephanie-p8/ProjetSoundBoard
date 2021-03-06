import { createSlice } from "@reduxjs/toolkit";

/**
 * Library slice  that contain sampler state and enable to add, edit and remove information from library
 * @author Stephanie PERAFAN
 * @version 1.1.0
 * @see {@link https://redux-toolkit.js.org/api/createSlice | createSlice Redux toolkit }
 */
export const librarySlice = createSlice({
  name: "library",
  initialState: [
    {
      name: "Cymbal",
      type: "default",
      url: require("../../assets/DefaultAudio/cymbal.wav"),
      crop: [2.3, 1],
      id: 0,
    },
    {
      name: "Daibyoshi",
      type: "default",
      url: require("../../assets/DefaultAudio/daibyoshi.wav"),
      crop: [1.3, 2],
      id: 1,
    },
    {
        name: "Med-taiko",
        type: "default",
        url: require("../../assets/DefaultAudio/med_taiko.wav"),
        crop: [0.5, 3],
        id: 2,
    },
    {
        name: "Miyadaiko",
        type: "default",
        url: require("../../assets/DefaultAudio/miyadaiko.wav"),
        crop: [1.0, 2],
        id: 3,
    },
    {
        name: "Taiko",
        type: "default",
        url: require("../../assets/DefaultAudio/taiko.wav"),
        crop: [2.3, 1],
        id: 4,
    },
    {
        name: "Tsuzumi",
        type: "default",
        url: require("../../assets/DefaultAudio/tsuzumi.wav"),
        crop: [0.0, 3],
        id: 5,
     },
  ],
  reducers: {
    add: (state, action) => {
      return [
        ...state,
        {
          name: action.payload.name,
          type: action.payload.type,
          crop: undefined,
          id: state[state.length - 1].id + 1,
        },
      ];
    },
    remove: (state, action) => {
      return state.filter((item) => item != action.payload.id);
    },
    edit: (state, action) => {
      // action.payload {id: 23, object: {name: "cat mewmew", crop: [1.2, 3]}}
      return state.map((item) =>
        item.id == action.payload.id
          ? { ...item, ...action.payload.object }
          : item
      );
    },
  },
});

export const { add, remove, edit } = librarySlice.actions; //reducer methods
export default librarySlice.reducer; //reducer

export const librarySelector = (state) => state.library; //selector
