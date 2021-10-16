// Request, Response
import { Request, Response } from 'express';
// Services
import UsuariosControlService from '../../services/control/usuarios-control-services';

export default class UsuariosControlController {

    constructor() { }

    /**
     * @author Mario Tavarez
     * @date 16/09/2021
     * @param req 
     * @param res 
     * @returns 
     */
    public async altaUsuario(req: Request, res: Response) {
        // Inicializa el servicio de usuarios
        const usuariosControlService = new UsuariosControlService();
        // Obtiene la respuesta del servicio del alta de usuario
        const responseUsuariosControl = await usuariosControlService.altaUsuario(req, res);
        // Devuelve la respuesta a la ruta
        return responseUsuariosControl;
    }


}