import axios from 'axios';

const storedUser = JSON.parse(localStorage.getItem('currentUser'));

let token = (storedUser && storedUser.accessToken) || null;

axios.interceptors.request.use(
  function (config) {
    if (
      token &&
      !(
        config.url.includes('/account/login') ||
        config.url.includes('/account/new')
      )
    ) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    if (response.data.accessToken) {
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      token = response.data.accessToken;
    }
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      !error.config.url.includes('/account/login')
    ) {
      localStorage.removeItem('currentUser');
      window.location.href = '/access';
    }
    return Promise.reject(error);
  }
);

export function createAccount(accountData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/account/new`,
    accountData
  );
}

export function login(accountData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/account/login`,
    accountData
  );
}

export function deleteAccount(accountData) {
  return axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/account`,
    accountData
  );
}
