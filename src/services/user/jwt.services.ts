import { verify, sign } from "jsonwebtoken"
import { jwtConfig } from "../../config/jwt"


export class JWTservice {
    constructor() { }

    //verifica y decodifica el Token recibido
    public static verify(token: string) {
        const decoded = verify(token, jwtConfig.SECRET)
        return decoded as any;
    }

    //Genera un nuevo token
    public static sign(payload: any) {

        const token = sign(payload, jwtConfig.SECRET, { expiresIn: "1h" })
        return token;
    }
}