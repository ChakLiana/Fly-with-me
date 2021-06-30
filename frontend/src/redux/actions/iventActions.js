import {
  IVENT_INIT,
  IVENT_CREATE,
  IVENT_ADD_PASSENGER,
  IVENT_DELETE_PASSENGER,
  IVENT_DELETE,
} from "../types/iventTypes";

export const iventInitFromBack = () => async (dispatch) => {
  const response = await fetch("http://localhost:8080/ivent");
  const dataFromBack = await response.json();

  dispatch(iventInit(dataFromBack.allIvents));
};

export const iventInit = (allIvents) => {
  return {
    type: IVENT_INIT,
    payload: allIvents,
  };
};

export const iventCreateOnBack = (iventData) => async (dispatch) => {
  const response = await fetch("http://localhost:8080/ivent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(iventData),
  });

  if (response.status === 200) {
    const newIvent = await response.json();
    dispatch(iventCreate(newIvent));
  }
};

export const iventCreate = (newIvent) => {
  return {
    type: IVENT_CREATE,
    payload: newIvent,
  };
};

export const iventAddPassengerOnBack =
  (selectIventId, currentUserId) => async (dispatch) => {
    const response = await fetch("http://localhost:8080/ivent", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectIventId, currentUserId }),
    });

    if (response.status === 200) {
      const iventWithNewPassenger = await response.json();
      dispatch(iventAddPassenger(iventWithNewPassenger));
    } else if (response.status === 418) {
      return;
    }
  };

export const iventAddPassenger = (iventWithNewPassenger) => {
  return {
    type: IVENT_ADD_PASSENGER,
    payload: iventWithNewPassenger,
  };
};

export const iventDeletePassengerOnBack =
  (selectIventId, currentUserId) => async (dispatch) => {
    const response = await fetch("http://localhost:8080/ivent", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectIventId, currentUserId }),
    });

    if (response.status === 200) {
      const iventWithOutNewPassenger = await response.json();
      dispatch(iventDeletePassenger(iventWithOutNewPassenger));
    } else if (response.status === 418) {
      return;
    }
  };
//---------
export const iventDeleteOnBack = (selectIventId) => async (dispatch) => {
  const response = await fetch("http://localhost:8080/ivent/tandem", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectIventId }),
  });

  if (response.status === 200) {
    dispatch(iventDelete(selectIventId));
  } else if (response.status === 418) {
    return;
  }
};

export const iventDelete = (selectIventId) => {
  return {
    type: IVENT_DELETE,
    payload: selectIventId,
  };
};

//-----------------------------------

export const iventDeletePassenger = (iventWithOutNewPassenger) => {
  return {
    type: IVENT_DELETE_PASSENGER,
    payload: iventWithOutNewPassenger,
  };
};
