import cors from 'cors';
import { whitelist } from '../env';

const CORS_Error: Error = <any>'Not Allowed By CORS';

export default cors({
  optionsSuccessStatus: 200,
  origin: (origin, cb) => {
    if (whitelist.has(origin!)) cb(null, true);
    else cb(CORS_Error);
  },
  credentials: true,
});
