// Express
import { Request, Response } from 'express';
// MongoDB
import { Collection } from 'mongodb';
// Connection
import Connection from "../classes/connection";
// Enviroment
import { COLLECTIONS, DATABASE } from "../global/enviroment";
// Log Server
import LogServer from '../classes/logServer';
// Log4js
import { Logger } from 'log4js';

export default class ProductosService {

    constructor() { }

    /**
     * @author Mario Tavarez
     * @description Devuelve el listado de productos
     * @date 18/09/2021
     * @param res 
     */
    public async getProductos(res: Response) {
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
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.productos);
        // Devuelve todos los productos disponibles
        const productos: Collection<any> | any = await quotesCollection.find({}).toArray();
        try {
            // Valida si existen productos registrados
            if (productos) {
                res.status(200).send({ status: 'OK', productos });
            } else {
                res.status(404).send({ status: 'NOK', message: 'No fue posible devolver los productos' });
            }
        } catch (error) {
            logger.error(`DEVOLUCION DE PRODUCTOS: No fue posible devolver los productos debido a ${error}`);
            res.status(404).send({ status: 'NOK', message: `No fue posible devolver los productos debido a ${error}` });
        } finally {
            connection.client.close();
        }
    }

    /**
     * @author Mario Tavarez
     * @date 18/07/2021
     * @description Devuelve los productos por categoria
     * @param req 
     * @param res 
     */
    public async getProductosByCategoria(req: Request ,res: Response) {
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
        // Id Categoria
        const {idCategoria} = req.params;
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.productos);
        // Devuelve todos los productos disponibles
        const productos: Collection<any> | any = await quotesCollection.find({idCategoria: idCategoria}).toArray();
        try {
            // Valida si existen productos registrados
            if (productos) {
                // Valida si devuelve productos
                if ( productos.length > 0) { 
                    res.status(200).send({ status: 'OK', productos });
                } else {
                    res.status(404).send({ status: 'OK', message: 'No existen productos asociados a esta categoría' });
                }
            } else {
                res.status(404).send({ status: 'NOK', message: 'No fue posible devolver los productos' });
            }

        } catch (error) {
            logger.error(`DEVOLUCION DE PRODUCTOS POR CATEGORIA: No fue posible devolver los productos debido a ${error}`);
            res.status(404).send({ status: 'NOK', message: `No fue posible devolver los productos debido a ${error}` });
        } finally {
            connection.client.close();
        }
    }
}


