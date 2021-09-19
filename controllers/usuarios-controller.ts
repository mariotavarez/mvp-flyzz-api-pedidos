// Request, Response
import { Request, Response } from 'express';
// Services
import UsuariosService from '../services/usuarios-services';

export default class UsuariosController { 

    constructor() {}

    /**
     * @author Mario Tavarez
     * @date 16/09/2021
     * @param req 
     * @param res 
     * @returns 
     */
    public async altaUsuario(req: Request, res: Response) {
        // Inicializa el servicio de usuarios
        const usuariosService = new UsuariosService();
        // Obtiene la respuesta del servicio del alta de usuario
        const responseUsuarios = await usuariosService.altaUsuario(req, res);
        // Devuelve la respuesta a la ruta
        return responseUsuarios;
    }

    /**
     * @author Mario Tavarez
     * @date 109/09/2021
     * @description Registra los datos de inicio del usuario
     * @param req 
     * @param res 
     */
    public async registrarDatosIniciales(req: Request, res: Response) {
        // Inicializa el servicio de usuarios
        const usuariosService = new UsuariosService();
        // Obtiene la respuesta del servicio de registro de datos iniciales
        const responseRegistroDatosIniciales = await usuariosService.registrarDatosIniciales(req, res);
        // Devuelve la respuesta a la ruta
        return responseRegistroDatosIniciales;

    }


}