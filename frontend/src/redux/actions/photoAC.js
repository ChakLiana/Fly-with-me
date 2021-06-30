// Adds photo Action Creator

export const ADD_PHOTO = "ADD_PHOTO";

export const addPhotoAC = (link) => {
  return {
    type: ADD_PHOTO,
    payload: link,
  };
};
