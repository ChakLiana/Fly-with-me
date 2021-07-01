import { DELETE_USER, SET_USER, TOKEN_TO_STORE } from "../types/userTypes";
import * as endPoints from "../../components/config/endPoints";
const storage = window.sessionStorage;


export const getUserFromServer = (id) => async (dispatch) => {
  const response = await fetch(endPoints.getUser(id), {
    credentials: "include",
  });
  if (response.status === 200) {
    const currentUser = await response.json();

    dispatch(setUser(currentUser));
  }
};
export const tonkenToStore = (token) => {
  return {
    type: TOKEN_TO_STORE,
    payload: token,
  };
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const signUp = (payload, history) => async (dispatch) => {
  const response = await fetch(endPoints.signUp(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    console.log(user);
    const token = user.token;
    storage.setItem("token", token);
    dispatch(setUser(user.newUser));

    history.replace("/user/cabinet");
  } else {
    history.replace("/signup");
  }
};

export const signIn = (payload, history) => async (dispatch) => {
  const response = await fetch(endPoints.signIn(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    const token = user.token;
    storage.setItem("token", token);
    dispatch(setUser(user.currentUser));
    history.replace("/");
  } else {
    history.replace("/signin");
  }
};

export const signOut = () => async (dispatch) => {
  const response = await fetch(endPoints.signOut(), {
    credentials: "include",
  });
  if (response.status === 200) {
    dispatch(deleteUser());
  }
};

// export const checkAuth = () => async (dispatch) => {
//   const response = await fetch(endPoints.checkAuth(), {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(storage.getItem("token")),
//   });
//   if (response.status === 200) {
//     const user = await response.json();
//     dispatch(setUser(user));
//   }
// };

export const editUser = (user) => async (dispatch) => {

    let token = storage.getItem('token')
  const response = await fetch("http://localhost:8080/api/v1/users/", {
    method: "PATCH",
    headers: {
      "authorization": `Bearer ${token} `,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
 
  } // find codes from back 
};

export const deleteUser = () => ({
  type: DELETE_USER,
});
