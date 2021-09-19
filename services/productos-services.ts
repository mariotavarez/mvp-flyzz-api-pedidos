import { Request, Response } from 'express';
import { Collection } from 'mongodb';
// Connection
import Connection from "../classes/connection";
// Enviroment
import { DATABASE } from "../global/enviroment";

export default class ProductosService {

    constructor() { }

    /**
     * @author Mario Tavarez
     * @description Devuelve el listado de productos
     * @date 18/09/2021
     * @param res 
     */
    public async getProductos(res: Response) {

        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion
        const quotesCollection = database.collection('productos');
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

        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Id Categoria
        const {idCategoria} = req.params;
        // Collecion
        const quotesCollection = database.collection('productos');

        console.log();
        
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
            res.status(404).send({ status: 'NOK', message: `No fue posible devolver los productos debido a ${error}` });
        } finally {
            connection.client.close();
        }
    }
}


