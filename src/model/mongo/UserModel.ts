import {Schema, model, Model} from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    username: string;
    password: string;
    admin: boolean;
}

interface IUserMethods  {
    encryptPassword(string): Promise<string>;
    matchPassword(string): Promise<boolean>;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
