// Enviroment
import { COLLECTIONS } from './../global/enviroment';
// Express
import { Request, Response } from "express";
// Connection DB
import { Collection, Db } from "mongodb";
// Connection Database
import Connection from "../classes/connection";
// Database
import { DATABASE } from "../global/enviroment";
// Models
import { CrearPedidoModel } from '../models/pedidos/crearPedido-model';
import { HistorialUsuarioModel } from '../models/productos/historialUsuario-model';
// Log Server
import LogServer from '../classes/logServer';
// Log4js
import { Logger } from 'log4js';

export default class PedidosService {

    constructor() { }

    /**
    * @author Mario Tavarez
    * @date 19/10/2021
    * @description Devuelve el listado de pedidos de los usuarios
    */
    public async getPedidos(res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.pedidos);
        try {
            // Da de alta el pedido del usuario
            const pedidos: Collection<any> | any = await quotesCollection.find({}).toArray();
            // Valida si devuelve pedidos
            if (pedidos) {
                res.status(200).send({ status: 'OK', pedidos: pedidos });
            } else {
                res.status(200).send({ status: 'OK', pedidos: [] });
            }
        } catch (error) {
            logger.error(`GET PEDIDOS: No fue posible devolver el listado de pedidos debido a: ${error}`);
            res.status(500).send({ status: 'NOK', message: `No fue posible devolver el listado de pedidos debido a: ${error}` });
        } finally {
            connection.client.close();
        }
    }

    /**
    * @author Mario Tavarez
    * @date 17/09/2021
    * @description Crea el pedido del usuario y lo registra en el historial de pedidos del usuario
    * @param req 
    * @param res 
    */
    public async crearPedido(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene el los datos del pedido
        const crearPedido: CrearPedidoModel = req.body;
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.pedidos);
        try {
            // Da de alta el pedido del usuario
            const idPedido = await (await quotesCollection.insertOne(crearPedido)).insertedId;
            // Crea el movimiento del historial del usuario
            const movimientoHistorialRegistered = await this.crearMovimientoHistorial(crearPedido, idPedido.toString(), database);
            // Si se creó el pedido y el movimiento en el historial del usuario entonces todo se registró correctamente
            if (idPedido && movimientoHistorialRegistered) {
                res.status(200).send({ status: 'OK', message: `Su pedido ha sido recibido, en breve usted disfrutará de la mejor experiencia de delivery cortesía de FLYZZ` });
            }
            if (idPedido && !movimientoHistorialRegistered) {
                res.status(200).send({ status: 'OK', message: `Su pedido ha sido recibido, en breve usted disfrutará de la mejor experiencia de delivery cortesía de FLYZZ` });
                logger.error(`CREAR PEDIDO: Pedido creado correctamente para el usuario ${crearPedido.idUsuario}, sin embargo, no fue posible registrar el movimiento en la colección de historial de usuarios`);
            }
        } catch (error) {
            logger.error(`CREAR PEDIDO: No fue posible crear el pedido del usuario ${crearPedido.idUsuario} debido a: ${error}`);
            res.status(500).send({ status: 'NOK', message: `No fue posible crear su pedido, por favor vuelva a intentarlo en unos minutos` });
        }
    }

    /**
     * @author Mario Tavarez
     * @date 22/09/2021
     * @description Agrega un movimiento al historial del usuario
     * @param pedido 
     * @param idPedido 
     * @param database 
     * @returns 
     */
    public async crearMovimientoHistorial(pedido: CrearPedidoModel, idPedido: string, database: Db) {
        // Valida si se ha creado el movimiento de historial del usuario
        let isCreated: boolean = false;
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.historialUsuarios);
        // Crear objeto de historial de usuario
        const historialUsuario: HistorialUsuarioModel = {
            idUsuario: pedido.idUsuario,
            idPedido: idPedido,
            fechaCreacion: new Date(),
            fechaModificacion: new Date()
        };
        // Da de alta el pedido del usuario
        const isInserted = await quotesCollection.insertOne(historialUsuario);

        // Valida si se ha insertado el historial del usuario
        if (isInserted) {
            isCreated = true;
        }

        return isCreated;

    }
}
