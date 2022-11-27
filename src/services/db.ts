import mongoose from 'mongoose';
import Config from '../config/config';

export const connectDb = () => {
    return mongoose.connect(Config.MONGO_SRV, { });
};
