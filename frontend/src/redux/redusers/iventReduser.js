import {
  IVENT_INIT,
  IVENT_CREATE,
  IVENT_ADD_PASSENGER,
  IVENT_DELETE_PASSENGER,
  IVENT_DELETE,
} from "../types/iventTypes";

export default function iventReduser(state = [], { type, payload }) {
  switch (type) {
    case IVENT_INIT: {
      return payload;
    }

    case IVENT_CREATE: {
      return [...state, payload];
    }

    case IVENT_ADD_PASSENGER: {
      const stateWithoutSelectAction = state.filter(
        (elem) => String(elem._id) !== String(payload._id)
      );
      return [...stateWithoutSelectAction, payload];
    }

    case IVENT_DELETE_PASSENGER: {
      const stateWithoutSelectAction = state.filter(
        (elem) => String(elem._id) !== String(payload._id)
      );
      return [...stateWithoutSelectAction, payload];
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
