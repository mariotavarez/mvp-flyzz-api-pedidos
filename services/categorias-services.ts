// Express
import { Response } from 'express';
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

export default class CategoriasService {

    constructor() {}

    /**
     * @author Mario Tavarez
     * @description Devuelve el listado de categorias
     * @date 18/09/2021
     * @param res 
     */
    public async getCategorias(res: Response) {
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
        const quotesCollection = database.collection(COLLECTIONS.categorias);
            // Realiza la busqueda de todas las categorias
            const categorias: Collection<any> | any = await quotesCollection.find({}).toArray();
            try {
                // Valida si existen categorias registradas
                if (categorias ) {
                    res.status(200).send({ status: 'OK', categorias });
                } else {
                    res.status(404).send({ status: 'NOK', message: 'No fue posible devolver las categorias' });
                }
            } catch (error) {
                logger.error(`LISTADO CATEGORIAS: No fue posible devolver las categorias debido a ${error}`);
                res.status(404).send({ status: 'NOK', message: `No fue posible devolver las categorias debido a ${error}` });
            } finally {
                connection.client.close();
            }
        } 
    }


