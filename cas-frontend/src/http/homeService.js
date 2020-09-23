import axios from 'axios';

export function getHomeTranslators(queryValues) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/home${queryValues}`);
}

export function getTranslatorsOrdered(translatorId) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/home/:translatorsOrder/${translatorId}`
  );
}
