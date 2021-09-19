import { AutenticacionModel } from './../models/autenticacion/autenticacion-model';
// Request, Response
import { Request, Response } from 'express';
import AutenticacionService from '../services/autenticacion-services';

export default class AutenticacionController { 

    constructor() {}

    /**
     * @author Mario Tavarez
     * @date 16/09/2021
     * @description Autentica el usuario por medio del correo y el password
     * @param req 
     * @param res 
     * @returns 
     */
    public async autenticarUsuario(req: Request, res: Response) {
        // Inicializa el servicio de autenticacion
        const autenticacionService = new AutenticacionService();
        // Invoca el servicio de autenticacion de usuarios
        const responseAutenticarUsuario = await autenticacionService.autenticarUsuario(req, res);
        // Devuelve el response de autenticacion de usuarios
        return responseAutenticarUsuario;
    }

}