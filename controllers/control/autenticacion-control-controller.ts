// Request, Response
import { Request, Response } from 'express';
// Services
import AutenticacionControlService from '../../services/control/autenticacion-control-services';

export default class AutenticacionControlController {

    constructor() { }

    /**
     * @author Mario Tavarez
     * @date 16/10/2021
     * @description Autentica el usuario por medio del correo y el password
     * @param req 
     * @param res 
     * @returns 
     */
    public async autenticarUsuarioControl(req: Request, res: Response) {
        // Inicializa el servicio de autenticacion
        const autenticacionControlService = new AutenticacionControlService();
        // Invoca el servicio de autenticacion de usuarios
        const responseAutenticarControlUsuario = await autenticacionControlService.autenticarUsuario(req, res);
        // Devuelve el response de autenticacion de usuarios
        return responseAutenticarControlUsuario;
    }


}