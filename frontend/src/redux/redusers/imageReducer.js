// images reducer

import { ADD_PHOTO } from "../actions/photoAC";

export default function imagesReducer(state, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...state.user,
        photo: action.payload,
      };

    default:
      return state;
  }
}
