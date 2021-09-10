const env = process.env;

// set production
export const prod = env.NODE_ENV === 'production' ? true : false;

// Ports and Paths
export const api_path: string = env.REACT_APP_API_PATH!;

export default env;
