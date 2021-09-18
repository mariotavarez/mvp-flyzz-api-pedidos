import { AutenticacionModel } from './../models/autenticacion/autenticacion-model';
// Request, Response
import { Request, Response } from 'express';
import AutenticacionService from '../services/autenticacion-services';

export default class AutenticacionController { 

    constructor() {}

    /**
     * @author Mario Tavarez
     * @date 16/09/2021
     * @param req 
     * @param res 
     * @returns 
     */
    public autenticarUsuario(req: Request, res: Response) {

        const autenticacion: AutenticacionModel = req.body;

        const autenticacionService = new AutenticacionService();

        autenticacionService.autenticarUsuario(req);

        return res.json({ok: true, mensaje: autenticacion});
    }

}