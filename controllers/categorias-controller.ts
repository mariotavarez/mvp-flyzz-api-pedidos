// Express
import { Request, Response } from "express";
// Services
import CategoriasService from "../services/categorias-services";

export default class CategoriasController {

    constructor() {}


    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Devuelve el listado de categorias
     * @param req 
     * @param res 
     * @returns 
     */
    public async getCategorias(req: Request, res: Response) {

        const categoriasService = new CategoriasService();

        const responseCategorias = categoriasService.getCategorias(res);

        return responseCategorias;

    }   

}