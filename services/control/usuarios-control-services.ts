// Enviroment
import { COLLECTIONS_CONTROL } from './../../global/enviroment';
// Express
import { Request, Response } from "express";
// Connection DB
import { Collection } from "mongodb";
// Connection Database
import Connection from "../../classes/connection";
// Database Control
import { DATABASE_CONTROL } from "../../global/enviroment";
// Models
import { RegistroControlModel } from '../../models/control/usuarios/registro-control-model';
// Security
import Security from '../../classes/security';
// Models
import { UsuarioCuentaModel } from '../../models/usuarios/usuarioCuenta-model';
// Log Server
import LogServer from '../../classes/logServer';
// Log4js
import { Logger } from 'log4js';

export default class UsuariosControlService {

    constructor() { }

    /**
    * @author Mario Tavarez
    * @date 15/10/2021
    * @description Registra los datos del usuario
    * @param req 
    * @param res 
    */
    public async altaUsuario(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene el los datos del usuario
        const altaUsuario: RegistroControlModel = req.body;
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE_CONTROL.dbName);
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS_CONTROL.usuarios);
        // Valida si ya se ha registrado anteriormente el correo del usuario
        const idRepeated: boolean = await this.validarExistenciaCorreo(altaUsuario.correo, quotesCollection);
        // Si no esta repetido entonces registra la cuenta del usuario
        if (!idRepeated) {
            // Instancia de la clase de Security
            const security = new Security();
            // Generacion de nuevo password
            altaUsuario.password = await security.generateHash(altaUsuario.password);
            // Realiza la insercion en la coleccion de usuarios
            await quotesCollection.insertOne(altaUsuario);
            try {
                res.status(200).send({ status: 'OK', message: 'Su cuenta se ha registrado exitosamente' });
            } catch (error) {
                logger.error(`ALTA USUARIOS CONTROL: No fue posible registrar los datos de la cuenta ${altaUsuario.correo} debido a ${error}`);
                res.status(404).send({ status: 'NOK', message: 'No fue posible registrar sus datos' });
            } finally {
                connection.client.close();
            }
        } else {
            res.status(200).send({ status: 'NOK', message: `El correo ${altaUsuario.correo} ya se ha dado de alta anteriormente, intente con uno diferente` });
        }
    }

    /**
     * @author Mario Tavarez
     * @date 15/10/2021
     * @description Valida si el correo ya se ha registrado anteriormente
     * @param correo 
     * @param quotesCollection 
     * @returns 
     */
    public async validarExistenciaCorreo(correo: string, quotesCollection: Collection) {

        let isRepeated: boolean = false;
        const registroCorreo: Collection<UsuarioCuentaModel> | any = await quotesCollection.findOne({ correo: correo });
        // Valida si devuelve informacion
        if (registroCorreo) {
            // Si el correo coincide con el correo ingresado entonces el correo esta repetido
            if (registroCorreo.correo === correo) {
                isRepeated = true;
            }
        }

        return isRepeated;
    }

}
