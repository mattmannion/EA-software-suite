import axios from 'axios';

axios.defaults.withCredentials = true;

export const volusionHeaders = {
  Accept: 'application/xml',
  'Content-Type': 'application/xml',
};
