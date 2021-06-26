import { CURRENT_COORDS_GET } from '../types/iventTypes';

export default function currentCoordsReduser(state = [], { type, payload }) {

  switch (type) {
    case CURRENT_COORDS_GET: {
      return payload;
    }

    default:
      return state;
  }
};
