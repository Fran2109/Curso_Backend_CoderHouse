import { createTransport } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import logger from "./../logs/index.js";
import path from 'path';

export default class mailer {
    constructor(user, pass, host, port) {
        this.transporter = createTransport({
            service: host,
            port: port,
            auth: {
                user: user,
                pass: pass
            }
        })
    }
    async sendMail(mailOptions) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (err) {
            logger.error(`Error al Enviar: ${err.message}`);
            throw new Error(`Error al Enviar: ${err.message}`)
        }
    }
    async sendMailInRegister(user, mail) {
        try {
            const html = generateHtml('./handlebars/register.handlebars', {
                title: "There is a New User Registered",
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                age: user.age,
                phone: user.phone,
            })
    
            const mailOptions = {
                from: "Servidor NodeJS",
                to: mail,
                subject: "Nuevo registro",
                html: html
            }
            return await this.sendMail(mailOptions);
        } catch (err) {
            logger.error(`Error al Enviar: ${err.message}`);
            throw new Error(`Error al Enviar: ${err.message}`)
        }
    }
    async sendMailInAccept(order, user, mailReceiver, title) {
        try {
            let total = 0;
            order.products.map((product) => {
                total += product.cant * product.product.price;
            })
            const html = generateHtml('./handlebars/accept.handlebars', {
                title: title,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                products: order.products,
                total: total
            })
    
            const mailOptions = {
                from: "Servidor NodeJS",
                to: mailReceiver,
                subject: "Orden Aceptada",
                html: html
            }
            return await this.sendMail(mailOptions);
        } catch (err) {
            logger.error(`Error al Enviar: ${err.message}`);
            throw new Error(`Error al Enviar: ${err.message}`)
        }
    }
    async sendMailInAcceptToUser(order, user) {
        return await this.sendMailInAccept(order, user, user.email, `Felicitaciones por su compra ${user.name} ${user.lastname}`)
    }
    async sendMailInAcceptToAdmin(order, user, mailReceiver) {
        return await this.sendMailInAccept(order, user, mailReceiver, `Nuevo pedido de ${user.name} ${user.lastname}`)
    }
}

const generateHtml = (templatePath, data) => {
    const __dirname = process.cwd();
    const templateSource = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');
    const template = handlebars.compile(templateSource);
    return template(data);
}