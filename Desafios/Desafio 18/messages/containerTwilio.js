import twilio from 'twilio';
import logger from '../logs/logger.js';

class containerTwilio {
  constructor(accountSid, authToken) {
    this.client = twilio(accountSid, authToken);
  }
  sendWhatsapp(to, from, body) {
    try {
        return this.client.messages.create({
            from,
            to,
            body
        });
    } catch (error) {
        logger.error(`Error al Enviar: ${error.message}`);
        throw new Error(`Error al Enviar: ${error.message}`)
    }
  }
}

export default containerTwilio;