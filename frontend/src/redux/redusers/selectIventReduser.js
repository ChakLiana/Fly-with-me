import { SELECT_IVENT_GET } from '../types/iventTypes';

export default function selectIventReduser(state = {}, { type, payload }) {
  switch (type) {

    case SELECT_IVENT_GET: {
      console.log(payload);
      return ({ ...state, ...payload });
    }

    default:
      return state;
  }
};
