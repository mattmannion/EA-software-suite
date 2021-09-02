import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import {
  prod,
  redis_host,
  redis_port,
  session_secret,
  session_age,
  session_name,
} from '../env';

const RedisStore = connectRedis(session);

const redisClient = createClient({
  port: redis_port,
  host: redis_host,
});

export default session({
  store: new RedisStore({ client: redisClient }),
  name: session_name,
  secret: session_secret,
  saveUninitialized: false,
  resave: false,
  unset: 'destroy',
  cookie: {
    secure: prod,
    httpOnly: true,
    maxAge: session_age,
  },
});
