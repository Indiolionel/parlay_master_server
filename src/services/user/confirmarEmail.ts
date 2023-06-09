import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv'

dotenv.config();
export const emailRegistro = async (datos: any) => {
  

    const respuesta_api = sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
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
        let sendMail

        sendMail = await sgMail.send(msg);

        return { mensaje: 'Se envio correctamente el email', sendMail };

    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return { error: 'Error al enviar el correo electrónico' };
    }

};