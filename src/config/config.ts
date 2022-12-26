import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv

dotenv.config();

export default {
    MONGO_SRV: process.env.MONGO_SRV || 'mongodb://localhost:27017?authMechanism=DEFAULT',
    PORT: argv.port || 8080,
    admin: true,
    SECRET_MONGO: process.env.SECRET_MONGO,
    SECRET_SESSION: process.env.SECRET_SESSION,
    SESSION_MAX_AGE: +process.env.SESSION_MAX_AGE
}