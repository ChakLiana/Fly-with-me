import axios from "axios";


  // Gets user info
 function  getUser () {
    return axios.get('http://localhost:8080/auth/user');
  }
  // Logs the user out
   function logout() {
    return axios.post('http://localhost:8080/auth/logout');
  }
  // Log the user in
   function login(username, password) {
    return axios.post('http://localhost:8080/auth/login', { username, password });
  }
  // New user registration
   function signup(userData) {
    return axios.post('http://localhost:8080/auth/signup', userData);
  }


const exportedObject = {
  getUser,
  logout,
  login,
  signup
};

export default exportedObject;
