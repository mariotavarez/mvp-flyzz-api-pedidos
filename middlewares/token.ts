// Request
import { NextFunction, Request, Response } from 'express';
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
                createAt: new Date(),
                subject: ASUNTO_TOKEN
            }
        }, TOKEN, { expiresIn: '24h' });

        return token;
    }

    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Valida el token del usuario
     * @param token 
     * @returns 
     */
    public async validateToken(req: Request, res: Response, next: NextFunction) {
        // Token autenticacion
        const token = req.header("x-auth-token");
        // Si no eiste el token entonces enviar codigo de token necesario
        if ( !token  ) {
            return res.status(403).send({status: 'NOK', message: 'Es necesario el token de autenticación'});
        }

        try {
            const responseToken = await jsonwebtoken.verify(token, TOKEN);
            next();
        } catch (error) {
            return res.status(404).send({status: 'NOK', message: 'El token es inválido'});
        }

    }



}