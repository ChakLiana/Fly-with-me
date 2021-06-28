import { IVENT_INIT, IVENT_CREATE } from '../types/iventTypes';


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
    body: JSON.stringify( iventData ),
  });

  if (response.status === 200) {
    const newIvent = await response.json();
    dispatch(iventCreate(newIvent));

  }
}

export const iventCreate = (newIvent) => {
  return {
    type: IVENT_CREATE,
    payload: newIvent,
  }
};


