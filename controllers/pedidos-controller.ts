// Express
import { Request, Response } from "express";
// Services
import PedidosService from "../services/pedidos-services";

export default class PedidosController {

    constructor() {}


    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Crea el pedido del usuario y registra un movimiento en la colección de historial de usuarios
     * @param req 
     * @param res 
     * @returns 
     */
    public async crearPedido(req: Request, res: Response) {
        // Inicializa el servicio de pedidos
        const pedidosService = new PedidosService();
        // Obtiene la respuesta de crear pedido
        const responseCrearPedido = await pedidosService.crearPedido(req, res);
        // Devuelve la respuesta de crear pedido
        return responseCrearPedido;

    }   

}