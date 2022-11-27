import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGO_SRV: process.env.MONGO_SRV || 'mongodb://localhost:27017?authMechanism=DEFAULT',
    PORT: process.env.PORT || 8080,
    admin: true
}