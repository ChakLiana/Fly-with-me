import { IVENT_INIT, IVENT_CREATE } from '../types/iventTypes';

export default function iventReduser(state = [], { type, payload }) {

  switch (type) {
    case IVENT_INIT: {
      return payload;
    }

    case IVENT_CREATE: {
      return [...state, payload];
    }

    default:
      return state;
  }
};
