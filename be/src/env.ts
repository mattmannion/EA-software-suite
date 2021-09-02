const env = process.env;

// set production
export const prod = env.NODE_ENV === 'prod' ? true : false;

// Ports and Paths
export const port: number = prod ? +env.PORT! : 7878;
export const path: string = prod ? env.URL! : 'http://localhost:';

export const redis_port: number = prod ? +env.REDIS_PORT! : 6379;
export const redis_host: string = prod ? env.REDIS_HOST! : 'localhost';

// APIs and other resources
export const vol_url: string = env.insert_order_v3!;

// CORS
const prodlist = new Set([env.WL_1]);
const devlist = new Set(['http://localhost:3000', 'http://localhost:7878']);
export const whitelist = prod ? prodlist : devlist;

// session settings
export const session_name: string = env.SESSION_NAME!;
export const session_age: number = +env.SESSION_AGE!;
export const session_secret: string = env.SESSION_SECRET!;

export default env;
