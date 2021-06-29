import { SELECT_IVENT_GET } from '../types/iventTypes';

export const getSelectIventFromBack = (lotitude, longitude) => async (dispatch) => {
  const response = await fetch(`http://localhost:8080/ivent/${lotitude}/${longitude}`);

  if (response.status === 200) {
    const selectIvent = await response.json();
    dispatch(getSelectIvent(selectIvent));
  }
}

export const getSelectIvent = (selectIvent) => {

  return {
    type: SELECT_IVENT_GET,
    payload: selectIvent,
  };
}


