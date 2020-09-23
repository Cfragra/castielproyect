import axios from 'axios';

export function getSearchResults(queryValues) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/search${queryValues}`);
}
