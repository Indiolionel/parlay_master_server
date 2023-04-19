import user, { UserInterface } from '../../mongo/models/user'
import { JWTservice } from './jwt.services';
import bcrypt from 'bcrypt'
import * as crypto from 'crypto';
import { emailRegistro } from './confirmarEmail';



export class UserService {
    constructor() { }


    public static async getAll() {
        try {
            const users = await user.find();
            return { success: true, data: users }
        } catch (error) {
            console.error(error)

            return { success: false, data: error }
        }

    }

    public static async create(data: UserInterface) {
        try {
            const { email } = data
            const emailDuplicate = await user.findOne({ email });
            if (emailDuplicate) return { sucess: false, error: "El email ya tiene una cuenta creada", code: "auth/email-already-in-use" };
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(data.password.toString(), salt)
            const token = crypto.randomBytes(20).toString('hex');

            const userData = await user.create({ ...data, password: hashPassword, token });

            const emailNodemailer = await emailRegistro({
                email: userData.email,
                username: userData.nombre,
                token: userData.token
            })
            return { success: true, data: emailNodemailer }
        } catch (error) {
            console.error(error)

            return { success: false, error: 'Hubo un error inesperado' }
        }

    }

    public static async login(data: UserInterface) {

        const { email } = data
        try {
            const userData = await user.findOne({ email });
            if (!userData) return { sucess: false, error: 'No existe el email registrado' };
            const token = JWTservice.sign({ id: userData?.id, email })

            const isMatch = await bcrypt.compare(data.password.toString(), userData?.password?.toString() ?? '');
            if (!isMatch) {
                return { sucess: false, error: 'Los datos ingresados son incorrectos' }
            }
            if (!userData.confirmado) {
                return { sucess: false, error: 'Debes confirmar la cuenta' }

            }
            return { success: true, data: { token, email: userData.email, nombre: userData.nombre, pago: userData.pago, rol: userData.rol } };

        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error inesperado' };
        }
    }

    public static async confirmarUsuario(token: any) {


        const usuarioConfirmar = await user.findOne({ token });
        if (!usuarioConfirmar) {
            const error = new Error("Token no válido");
            return { sucess: false, error: error };
        }

        try {
            usuarioConfirmar.confirmado = true;
            usuarioConfirmar.token = "";
            await usuarioConfirmar.save();
            return ({ success: true, data: usuarioConfirmar });
        } catch (error) {
            return { sucess: false, error: "Error inesperado" }
        }
    }

}
