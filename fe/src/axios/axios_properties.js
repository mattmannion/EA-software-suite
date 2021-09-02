import axios from 'axios';

axios.defaults.withCredentials = true;

export const api_path = process.env.REACT_APP_API_PATH;

export const volusionHeaders = {
  Accept: 'application/xml',
  'Content-Type': 'application/xml',
};
