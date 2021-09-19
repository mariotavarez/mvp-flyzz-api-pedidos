// Express
import { Request, Response } from 'express';
// Collection
import { Collection } from 'mongodb';
// Connection
import Connection from "../classes/connection";
// Databases
import { COLLECTIONS, DATABASE } from './../global/enviroment';
// Models
import { AutenticacionModel } from '../models/autenticacion/autenticacion-model';
// Token
import Token from '../middlewares/token';


export default class AutenticacionService {

    constructor() { }

   
    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Autentica al usuario por medio de el correo y el password
     * @param req 
     * @param res 
     */
    public async autenticarUsuario(req: Request, res: Response) {

        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Autenticacion Usuario
        const autenticacion: AutenticacionModel = req.body;
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.usuarios);
        // Devuelve el usuario por medio de correo y password
        const usuario: Collection<any> | any = await quotesCollection.findOne({correo: autenticacion.correo});
        try {
            // Valida si existen productos registrados
            if (usuario) {
                // Valida si la contraseña es correcta
                if ( usuario.password === autenticacion.password ) {
                    // Inicializar clase Token
                    const token = new Token();
                    // Generar token de usuario
                    const tokenGenerate = await token.generateToken(autenticacion);
                    // Enviar token de usuario
                    res.status(200).send({ status: 'OK', message: 'Credenciales correctas', token: tokenGenerate });
                } else {
                    res.status(300).send({ status: 'NOK', message: 'Las credenciales son incorrectas' });
                }
            } else {
                res.status(404).send({ status: 'NOK', message: `El correo ${autenticacion.correo} no se encuentra registrado` });
            }

        } catch (error) {
            res.status(404).send({ status: 'NOK', message: `No fue posible autenticar su cuenta debido a ${error}` });
        } finally {
            connection.client.close();
        }
    }
}