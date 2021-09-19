// Express
import { Request, Response } from "express";
// Services
import ProductosService from "../services/productos-services";

export default class ProductosController {

    constructor() {}


    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Devuelve el listado de productos
     * @param req 
     * @param res 
     * @returns 
     */
    public async getProductos(req: Request, res: Response) {

        const productosService = new ProductosService();

        const responseProductosService = productosService.getProductos(res);

        return responseProductosService;

    }   
    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Devuelve el listado de productos por categoria
     * @param req 
     * @param res 
     * @returns 
     */
    public async getProductosByCategoria(req: Request, res: Response) {

        const productosService = new ProductosService();

        const responseProductosServiceByCategoria = productosService.getProductosByCategoria(req, res);

        return responseProductosServiceByCategoria;

    }   

}