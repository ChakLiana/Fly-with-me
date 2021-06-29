import { IVENT_INIT, IVENT_CREATE, IVENT_ADD_PASSENGER } from '../types/iventTypes';

export default function iventReduser(state = [], { type, payload }) {

  switch (type) {
    case IVENT_INIT: {
      return payload;
    }

    case IVENT_CREATE: {
      return [...state, payload];
    }

    case IVENT_ADD_PASSENGER: {
      const stateWithoutSelectAction = state.filter((elem) => !elem._id);
      return [...stateWithoutSelectAction, payload];
    }

    default:
      return state;
  }
};
