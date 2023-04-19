"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegistro = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const emailRegistro = (datos) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(datos);
    console.log("api sendGrid", process.env.SENDGRID_API_KEY);
    console.log("url frontend", process.env.FRONTEND_URL);
    const respuesta_api = mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("api-key-sengrid", respuesta_api);
    const { email, username, token } = datos;
    const htmlConfirmar = `<p>Hola: ${username} Confirma tu cuenta en parlay-master</p>
    <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace: 
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`;
    const msg = {
        to: email,
        from: "parlay.x.master@gmail.com",
        subject: "parlay-master - Confirma tu cuenta",
        text: "Confirma tu cuenta en parlay-master",
        html: htmlConfirmar,
    };
    try {
        let sendMail;
        console.log("llega aca", msg);
        sendMail = yield mail_1.default.send(msg);
        console.log("llega aca 2");
        return { mensaje: 'Se envio correctamente el email', sendMail };
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return { error: 'Error al enviar el correo electrónico' };
    }
});
exports.emailRegistro = emailRegistro;
