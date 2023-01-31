import config from '../config/config'
import twilio from 'twilio';
import log4js from "log4js";
import {ApiError} from "../exceptions/ApiError";
const logger = log4js.getLogger();

const twilioClient = twilio(config.TWILIO_SID, config.TWILIO_TOKEN);

export const sendSms = async(to, body) => {
    try {
        const message = {
            body: body,
            from: config.TWILIO_SMS_FROM,
            to: to,
        };
        return await twilioClient.messages.create(message);
    } catch (error) {
        logger.error(error);
        throw new ApiError({status: 500, message: `Error al enviar el sms`});
    }
}
export const sendWhatsapp = async(to, body) => {
    try {
        const message = {
            body: body,
            from: config.TWILIO_WHATSAPP_FROM,
            to: `whatsapp:${to}`,
        };
        return await twilioClient.messages.create(message);
    } catch (error) {
        logger.error(error);
        throw new ApiError({status: 500, message: `Error al enviar el whatsapp`});
    }
}