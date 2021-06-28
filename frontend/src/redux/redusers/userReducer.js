import { DELETE_USER, SET_USER, TOKEN_TO_STORE } from "../types/userTypes";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload

    case DELETE_USER:
      return null

    case TOKEN_TO_STORE:
      const tokenFromLs  = window.localStorage.getItem('token')
      return {...state,  token: tokenFromLs}

    default:
      return state
  }
}

export default userReducer
