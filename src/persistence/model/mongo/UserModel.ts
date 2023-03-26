import {model, Model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    username: string;
    password: string;
    admin: boolean;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    age: number;
    phone: string;
    avatarURL: string;
}

interface IUserMethods  {
    encryptPassword(string): Promise<string>;
    matchPassword(string): Promise<boolean>;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: false },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    avatarURL: { type: String, required: false },
    admin: { type: Boolean, default: false },
});

userSchema.method('encryptPassword', async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
});

userSchema.method('matchPassword', async function(password) {
    return await bcrypt.compare(password, this.password);
});

export const UserModel = model<IUser, UserModel>('user', userSchema);
