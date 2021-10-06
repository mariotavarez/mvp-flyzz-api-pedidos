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

export default class BannersService {

    constructor() {}

    /**
     * @author Mario Tavarez
     * @description Devuelve el listado de banners
     * @date 18/09/2021
     * @param res 
     */
    public async getBanners(res: Response) {
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
        const quotesCollection = database.collection(COLLECTIONS.banners);
            // Realiza la busqueda de todas los banners
            const banners: Collection<any> | any = await quotesCollection.find({}).toArray();
            try {
                // Valida si existen banners registrados
                if (banners ) {
                    res.status(200).send({ status: 'OK', banners });
                } else {
                    res.status(404).send({ status: 'NOK', message: 'No fue posible devolver el listado de banners' });
                }
            } catch (error) {
                logger.error(`LISTADO BANNERS: No fue posible devolver los banners debido a ${error}`);
                res.status(404).send({ status: 'NOK', message: `No fue posible devolver los banners debido a ${error}` });
            } finally {
                connection.client.close();
            }
        } 
    }


