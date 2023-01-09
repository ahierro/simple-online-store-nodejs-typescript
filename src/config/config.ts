import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import os from 'os';

const argv = yargs(hideBin(process.argv)).argv

dotenv.config();

export default {
    argv,
    MONGO_SRV: process.env.MONGO_SRV || 'mongodb://localhost:27017?authMechanism=DEFAULT',
    PORT: argv.port || 8080,
    MODE: argv.mode || 'fork',
    NUM_CPUS: os.cpus().length,
    admin: true,
    SECRET_MONGO: process.env.SECRET_MONGO,
    SECRET_SESSION: process.env.SECRET_SESSION,
    SESSION_MAX_AGE: +process.env.SESSION_MAX_AGE
}