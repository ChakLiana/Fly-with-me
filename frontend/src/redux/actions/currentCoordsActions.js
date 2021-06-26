import { CURRENT_COORDS_GET } from '../types/iventTypes';


export const currentCoordsGet = (currentCoords) => {
  return {
    type: CURRENT_COORDS_GET,
    payload: currentCoords,
  };
}
