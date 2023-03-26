import {validateObj} from "../services/requestValidationService";
import {plainToClassFromExist} from 'class-transformer';
import {SignUpDTO} from "../dto/SignUpDTO";
import {generateAuthToken} from "../services/authService";
import {UserModel} from "../persistence/model/mongo/UserModel";
import {LoginDTO} from "../dto/LoginDTO";
import log4js from "log4js";

const logger = log4js.getLogger();

function respondWithToken(res, token: string) {
    res.json({
        token,
    });
}

export const login = async (req, res) => {
    const loginDTO = plainToClassFromExist(new LoginDTO(), req.body);
    validateObj(loginDTO);

    const username = loginDTO.username;
    const user = await UserModel.findOne({username});

    if (!user || !(await user.matchPassword(loginDTO.password))) {
        return res.status(401).json({error: 'Invalid Username/Password'});
    } else {
        const token = generateAuthToken(user);
        respondWithToken(res, token);
    }
}

export const signup = async (req, res) => {
    const signUpDTO = plainToClassFromExist(new SignUpDTO(), req.body);
    validateObj(signUpDTO);

    const query = {
        $or: [{username: signUpDTO.username}, {email: signUpDTO.email}],
    };
    try {
        const user = await UserModel.findOne(query);

        if (user) return res.status(400).json({error: 'User already exists'});

        const newUser = new UserModel({...signUpDTO});
        newUser.password = await newUser.encryptPassword(signUpDTO.password);
        await newUser.save();
        const token = generateAuthToken(newUser);

        respondWithToken(res, token);
    } catch (error) {
        logger.error(error);
        if (error.code === 11000) {
            res.status(500).json({error: 'User Already exists'});
        }
        res.status(500).json({error: 'Unexpected error'});
    }
}