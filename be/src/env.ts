const env = process.env;

// set production
export const prod = env.NODE_ENV === 'prod' ? true : false;

// Ports and Paths
export const port: number = prod ? +env.PORT! : 7878;
export const path: string = prod ? env.URL! : 'http://localhost:';

// APIs and other resources
export const vol_url: string = env.insert_order_v3!;

export default env;
