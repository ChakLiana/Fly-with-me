import { IVENT_INIT, IVENT_CREATE, IVENT_ADD_PASSENGER, SELECT_IVENT_GET } from '../types/iventTypes';

export default function iventReduser(state = [], { type, payload }) {

  switch (type) {
    case IVENT_INIT: {
      return payload;
    }

    case IVENT_CREATE: {
      return [...state, payload];
    }

    case IVENT_ADD_PASSENGER: {
      const stateWithoutSelectAction = state.filter((elem) => String(elem._id) !== String(payload._id));
      return [...stateWithoutSelectAction, payload];
    }

    default:
      return state;
  }
};
