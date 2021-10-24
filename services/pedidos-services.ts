import { ObjectID } from 'mongodb';
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
// Services
import UsuariosService from './usuarios-services';
// Constants
import { ESTATUS_PEDIDO } from './../global/constants';

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
            if (pedidos.length > 0) {
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
        const pedido: CrearPedidoModel = req.body;
        const crearPedido = {
            idUsuario: pedido.idUsuario,
            productos: pedido.productos,
            total: pedido.total,
            direccion: pedido.direccion,
            noExt: pedido.noExt,
            noInt: pedido.noInt,
            latitud: pedido.latitud,
            longitud: pedido.longitud,
            estatus: ESTATUS_PEDIDO.enProceso,
            idDrone: null,
            fechaCreacion: new Date(),
            fechaModificacion: new Date()
        }
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.pedidos);
        try {

            // Valida que el usuario se encuentre registrado
            const usuariosService = new UsuariosService();
            const usuarioRegistrado = await usuariosService.getCorreoUsuarioById(pedido.idUsuario, database, logger);
            if (usuarioRegistrado !== null) {
                // Da de alta el pedido del usuario
                const idPedido = await (await quotesCollection.insertOne(crearPedido)).insertedId;
                // Crea el movimiento del historial del usuario
                const movimientoHistorialRegistered = await this.crearMovimientoHistorial(crearPedido, idPedido.toString(), database);
                // Si se creó el pedido y el movimiento en el historial del usuario entonces todo se registró correctamente
                if (idPedido && movimientoHistorialRegistered) {
                    res.status(200).send({ status: 'OK', message: `Su pedido ha sido recibido, en breve usted disfrutará de la mejor experiencia de delivery cortesía de FLYZZ`, idPedido: idPedido });
                }
                if (idPedido && !movimientoHistorialRegistered) {
                    res.status(200).send({ status: 'OK', message: `Su pedido ha sido recibido, en breve usted disfrutará de la mejor experiencia de delivery cortesía de FLYZZ`, idPedido: idPedido });
                    logger.error(`CREAR PEDIDO: Pedido creado correctamente para el usuario ${crearPedido.idUsuario}, sin embargo, no fue posible registrar el movimiento en la colección de historial de usuarios`);
                }
            } else {
                logger.info(`CREAR PEDIDO: El usuario ${pedido.idUsuario} no se encuentra registrado`);
                res.status(404).send({ status: 'NOK', message: `Este usuario no se encuentra registrado` });
            }

        } catch (error) {
            logger.error(`CREAR PEDIDO: No fue posible crear el pedido del usuario ${crearPedido.idUsuario} debido a: ${error}`);
            res.status(500).send({ status: 'NOK', message: `No fue posible crear su pedido, por favor vuelva a intentarlo en unos minutos` });
        } finally {
            connection.client.close();
        }
    }

    /**
     * @author Mario Tavarez
     * @date 23/10/2021
     * @descripton Devuelve el estatus del pedido
     * @param req 
     * @param res 
     */
    public async getEstatusPedidoById(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();

        const { idPedido } = req.params;

        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.pedidos);
        if (idPedido.length <= 24) {
            try {
                // Busca el estatus del pedido buscandolo por id
                const pedido: Collection<any> | any = await quotesCollection.findOne({ _id: new ObjectID(idPedido) });
                // Valida si devuelve pedidos
                if (pedido) {
                    res.status(200).send({ status: 'OK', estatusPedido: pedido.estatus });
                } else {
                    res.status(404).send({ status: 'NOK', message: `Este pedido no ha sido registrado` });
                }

            } catch (error) {
                logger.error(`GET ESTATUS PEDIDO BY ID: Occurró un error al devolver el estatus del pedido ${idPedido} debido a: ${error}`);
                res.status(500).send({ status: 'NOK', message: `No fue posible devolver el estatus del pedido debido a un error inesperado` });
            } finally {
                connection.client.close();
            }
        } else {
            res.status(300).send({ status: 'NOK', message: `El número de pedido no es vàlido` });
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
            direccion: pedido.direccion,
            noExt: pedido.noExt,
            noInt: pedido.noInt,
            latitud: pedido.latitud,
            longitud: pedido.longitud,
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
