const env = process.env;

// set production
export const prod = env.NODE_ENV === 'production' ? true : false;

// Ports and Paths
export const port: number = prod ? +env.PORT! : 3000;
export const path: string = prod ? env.URL! : 'http://localhost:';
export const api_path: string = prod
  ? env.REACT_APP_API_PATH!
  : 'http://localhost:7878';

export default env;
