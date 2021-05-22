import { createSlice } from "@reduxjs/toolkit";

export const librarySlice = createSlice({
  name: "library",
  initialState: [
    {
      name: "cymbal",
      type: "default",
      url: require("../../assets/DefaultAudio/cymbal.wav"),
      crop: [2.3, 1],
      id: 0,
    },
    {
      name: "daibyoshi",
      type: "default",
      url: require("../../assets/DefaultAudio/daibyoshi.wav"),
      crop: [1.3, 2],
      id: 1,
    },
    {
        name: "med_taiko",
        type: "default",
        url: require("../../assets/DefaultAudio/med_taiko.wav"),
        crop: [0.5, 3],
        id: 2,
    },
    {
        name: "miyadaiko",
        type: "default",
        url: require("../../assets/DefaultAudio/miyadaiko.wav"),
        crop: [1.0, 2],
        id: 3,
    },
    {
        name: "taiko",
        type: "default",
        url: require("../../assets/DefaultAudio/taiko.wav"),
        crop: [2.3, 1],
        id: 4,
    },
    {
        name: "tsuzumi",
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

export const { add, remove, edit } = librarySlice.actions;
export default librarySlice.reducer;

export const librarySelector = (state) => state.library;
