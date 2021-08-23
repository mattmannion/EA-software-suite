export const api_path = process.env.REACT_APP_API_PATH;
export const headers = {
  origin: process.env.REACT_APP_LOCATION,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const volusionHeaders = {
  Accept: 'application/xml',
  'Content-Type': 'application/xml',
};

export const AxiosConfig = {
  // withCredentials: true,
};
