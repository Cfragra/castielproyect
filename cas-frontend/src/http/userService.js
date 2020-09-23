import axios from 'axios';

export function getUser(userId) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`);
}

export function getProfile() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
}

export function uploadAvatar(userData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/users/avatar`,
    userData
  );
}

export function updateProfile(userData) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
    userData
  );
}
