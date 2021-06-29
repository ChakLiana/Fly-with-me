import { IVENT_INIT, IVENT_CREATE, IVENT_ADD_PASSENGER } from '../types/iventTypes';


export const iventInitFromBack = () => async (dispatch) => {
  const response = await fetch('http://localhost:8080/ivent');
  const dataFromBack = await response.json();

  dispatch(iventInit(dataFromBack.allIvents));
};

export const iventInit = (allIvents) => {
  return {
    type: IVENT_INIT,
    payload: allIvents,
  };
}


export const iventCreateOnBack = (iventData) => async (dispatch) => {
  const response = await fetch('http://localhost:8080/ivent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(iventData),
  });

  if (response.status === 200) {
    const newIvent = await response.json();
    console.log(newIvent);
    dispatch(iventCreate(newIvent));

  }
}

export const iventCreate = (newIvent) => {
  return {
    type: IVENT_CREATE,
    payload: newIvent,
  }
};

export const iventAddPassengerOnBack = (lotitude, longitude, passengerId) => async (dispatch) => {
  const response = await fetch('http://localhost:8080/ivent', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lotitude, longitude, passengerId }),
  });

  if (response.status === 200) {
    const iventWitNewPassenger = await response.json();
    dispatch(iventAddPassenger(iventWitNewPassenger));

  } else if (response.status === 404) {
    return;
  }
};

export const iventAddPassenger = (iventWitNewPassenger) => {
  return {
    type: IVENT_ADD_PASSENGER,
    payload: iventWitNewPassenger,
  }
};


