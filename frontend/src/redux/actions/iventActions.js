
import { IVENT_INIT,  IVENT_DELETE, IVENT_CREATE, IVENT_ADD_PASSENGER, IVENT_DELETE_PASSENGER, IVENT_ACCEPT_PASSENGER, IVENT_REJECT_PASSENGER, IVENT_PENDING_PASSENGER } from '../types/iventTypes';



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


export const iventAcceptPassengerOnBack = (selectIventId, selectUserId) => async (dispatch) => {
  const response = await fetch('http://localhost:8080/ivent/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selectIventId, selectUserId }),
  });

  if (response.status === 200) {
    const iventWithAcceptPassenger = await response.json();
    dispatch(iventAcceptPassenger(iventWithAcceptPassenger));

  } else if (response.status === 418) {
    return;
  }
};

export const iventAcceptPassenger = (iventWithAcceptPassenger) => {
  return {
    type: IVENT_ACCEPT_PASSENGER,
    payload: iventWithAcceptPassenger,
  }
};

export const iventRejectPassengerOnBack = (selectIventId, selectUserId) => async (dispatch) => {
  const response = await fetch('http://localhost:8080/ivent/status', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selectIventId, selectUserId }),
  });

  if (response.status === 200) {
    const iventWithRejectPassenger = await response.json();
    dispatch(iventRejectPassenger(iventWithRejectPassenger));

  } else if (response.status === 418) {
    return;
  }
};

export const iventRejectPassenger = (iventWithRejectPassenger) => {
  return {
    type: IVENT_REJECT_PASSENGER,
    payload: iventWithRejectPassenger,
  }
};

export const iventPendingPassengerOnBack = (selectIventId, selectUserId) => async (dispatch) => {
  const response = await fetch('http://localhost:8080/ivent/status', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selectIventId, selectUserId }),
  });

  if (response.status === 200) {
    const iventWithPendingPassenger = await response.json();
    dispatch(iventPendingPassenger(iventWithPendingPassenger));

  } else if (response.status === 418) {
    return;
  }
};

export const iventPendingPassenger = (iventWithPendingPassenger) => {
  return {
    type: IVENT_PENDING_PASSENGER,
    payload: iventWithPendingPassenger,
  }
};





