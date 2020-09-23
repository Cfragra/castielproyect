import axios from 'axios';

export function getTranslator(translatorId) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/translator/${translatorId}`
  );
}

export function updateProfile(translatorData, translatorId) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/translator/${translatorId}`,
    translatorData
  );
}
