import dotenv from 'dotenv';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import os from 'os';

const argv = yargs(hideBin(process.argv)).argv

dotenv.config();

export default {
    argv,
    MONGO_SRV: process.env.MONGO_SRV || 'mongodb://localhost:27017?authMechanism=DEFAULT',
    PORT: process.env.PORT || 8080,
    NUM_CPUS: os.cpus().length,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_SMS_FROM: process.env.TWILIO_SMS_FROM,
    TWILIO_WHATSAPP_FROM: process.env.TWILIO_WHATSAPP_FROM,
    ETHEREAL_PORT: process.env.ETHEREAL_PORT,
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
    ETHEREAL_HOST: process.env.ETHEREAL_HOST,
    admin: true,
    SECRET_MONGO: process.env.SECRET_MONGO,
    SECRET_SESSION: process.env.SECRET_SESSION,
    SESSION_MAX_AGE: +process.env.SESSION_MAX_AGE,
    FACTORY: process.env.FACTORY,
}