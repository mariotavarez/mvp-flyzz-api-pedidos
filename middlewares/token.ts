// Enviroment
import { TOKEN } from './../global/enviroment';
// Models
import { AutenticacionModel } from './../models/autenticacion/autenticacion-model';
// Json Web Token
import jsonwebtoken from 'jsonwebtoken';
// Constants
import { ASUNTO_TOKEN } from '../global/constants';

export default class Token {

    constructor() { }

    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Genera el nuevo token del usuario de 24 horas
     * @param autenticacion 
     * @returns 
     */
    public async generateToken(autenticacion: AutenticacionModel) {

        // Genera el token del usuario
        const token = await jsonwebtoken.sign({
            payload: {
                correo: autenticacion.correo,
                createAt: new Date()
            }
        }, TOKEN, { expiresIn: '24h' });

        return token;
    }



}