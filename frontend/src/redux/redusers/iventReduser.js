

import { IVENT_INIT, IVENT_DELETE, IVENT_CREATE, IVENT_ADD_PASSENGER, IVENT_DELETE_PASSENGER, IVENT_ACCEPT_PASSENGER, IVENT_REJECT_PASSENGER, IVENT_PENDING_PASSENGER } from '../types/iventTypes';



export default function iventReduser(state = [], { type, payload }) {
  switch (type) {
    case IVENT_INIT: {
      return payload;
    }

    case IVENT_CREATE: {
      return [...state, payload];
    }

    case IVENT_ADD_PASSENGER: {

      const stateWithoutSelectIvent = state.filter((elem) => String(elem._id) !== String(payload._id));
      return [...stateWithoutSelectIvent, payload];
    }

    case IVENT_DELETE_PASSENGER: {
      const stateWithoutSelectIvent = state.filter((elem) => String(elem._id) !== String(payload._id));
      return [...stateWithoutSelectIvent, payload];
    }

    case IVENT_ACCEPT_PASSENGER: {
      const stateWithoutSelectIvent = state.filter((elem) => String(elem._id) !== String(payload._id));
      return [...stateWithoutSelectIvent, payload];
    }

    case IVENT_REJECT_PASSENGER: {
      const stateWithoutSelectIvent = state.filter((elem) => String(elem._id) !== String(payload._id));
      return [...stateWithoutSelectIvent, payload];
    }

    case IVENT_PENDING_PASSENGER: {
      const stateWithoutSelectIvent = state.filter((elem) => String(elem._id) !== String(payload._id));
      return [...stateWithoutSelectIvent, payload];

    }

    case IVENT_DELETE: {
      console.log("в делитеееееееееееееееееееееее");
      const stateWithoutDeleteIvent = state.filter(
        (elem) => String(elem._id) !== String(payload)
      );
      return stateWithoutDeleteIvent;
    }

    default:
      return state;
  }
}
