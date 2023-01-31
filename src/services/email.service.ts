import {createTransport} from 'nodemailer';
import {ApiError} from "../exceptions/ApiError";
import log4js from "log4js";
import config from '../config/config';
const logger = log4js.getLogger();

const transporter = createTransport({
    host: config.ETHEREAL_HOST,
    port: config.ETHEREAL_PORT,
    auth: {
        user: config.ETHEREAL_EMAIL,
        pass: config.ETHEREAL_PASSWORD,
    }
});

export const sendMail = async (subject: string, message: string) => {
    try {
        await transporter.sendMail({
            from: config.ETHEREAL_EMAIL,
            to: config.ETHEREAL_EMAIL,
            subject,
            html: message,
            attachments: []
        });
    } catch (error) {
        logger.error(`Error al enviar el mail: ${error}`);
        throw new ApiError({status: 500, message: `Error al enviar el mail`});
    }
};