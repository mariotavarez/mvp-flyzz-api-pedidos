import { Response } from 'express';
import { Collection } from 'mongodb';
// Connection
import Connection from "../classes/connection";
import { DATABASE } from "../global/enviroment";

export default class CategoriasService {

    constructor() {}

    /**
     * @author Mario Tavarez
     * @description Devuelve el listado de categorias
     * @date 18/09/2021
     * @param res 
     */
    public async getCategorias(res: Response) {

        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion
        const quotesCollection = database.collection('categorias');
        // Si no esta repetido entonces registra la cuenta del usuario
            // Realiza la insercion en la coleccion de usuarios
            const categorias: Collection<any> | any = await quotesCollection.find({}).toArray();
            console.log(categorias);
            
            try {
                // Valida si existen categorias registradas
                if (categorias ) {
                    res.status(200).send({ status: 'OK', categorias });
                } else {
                    res.status(404).send({ status: 'NOK', message: 'No fue posible devolver las categorias' });
                }
               
            } catch (error) {
                res.status(404).send({ status: 'NOK', message: `No fue posible devolver las categorias debido a ${error}` });
            } finally {
                connection.client.close();
            }
        } 
    }


