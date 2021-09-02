const env = process.env;

// set production
export const prod = env.NODE_ENV === 'production' ? true : false;

// Ports and Paths
export const port = prod ? +env.PORT : 3000;
export const pathstring = prod ? env.URL : 'http://localhost:';

export default env;
