// Enviroment
import { COLLECTIONS } from './../global/enviroment';
// Express
import { Request, Response } from "express";
// Constants
import { PLANTILLAS_CORREO } from '../global/constants';
// Connection DB
import { Collection } from "mongodb";
// Connection Database
import Connection from "../classes/connection";
// Database
import { DATABASE } from "../global/enviroment";
// Models
import { AltaUsuarioModel } from "../models/usuarios/registro-model";
// Utils
import Mail from "../utils/mail";
// Security
import Security from '../classes/security';
// Models
import { UsuarioCuentaModel } from '../models/usuarios/usuarioCuenta-model';
import { RegistroDatosInicialesModel } from '../models/usuarios/registroDatosIniciales-model';
// Log Server
import LogServer from '../classes/logServer';
// Log4js
import { Logger } from 'log4js';

export default class UsuariosService {

    constructor() { }

    /**
    * @author Mario Tavarez
    * @date 17/09/2021
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
        const altaUsuario: AltaUsuarioModel = req.body;
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.usuarios);
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
                // Inicializa Correo
                const mail = new Mail();
                // Envia el email al usuario registrado
                await mail.sendMail(altaUsuario.correo, PLANTILLAS_CORREO.registro).then(email => {
                    res.status(200).send({ status: 'OK', message: 'Usuario dado de alta correctamente' });
                }).catch(error => {
                    logger.error(`ALTA USUARIOS: Usuario dada de alta correctamente, sin enbargo no fue posible enviar el correo de registro a la dirección de correo ${altaUsuario.correo} debido a ${error.message}`);
                    res.status(200).send({ status: 'NOK', message: `Usuario dada de alta correctamente, sin enbargo no fue posible enviar el correo de registro a la dirección de correo ${altaUsuario.correo}` });
                });
            } catch (error) {
                logger.error(`ALTA USUARIOS: No fue posible registrar los datos de la cuenta ${altaUsuario.correo} debido a ${error}`);
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
     * @date 17/09/2021
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

    /**
     * @author Mario Tavarez
     * @date 19/09/2021
     * @description Valida si tiene datos registrados el usuario, si tiene datos entonces regresa true, de lo contrario false ya que es la primera vez que
     *              el usuario ingresara sus datos
     * @param idUsuario 
     * @param database 
     * @returns 
     */
    public async validarRegistroDatosInicialesUsuario(idUsuario: string, database: any) {

        // Valida si tiene datos registrados el usuario
        let hadData: boolean = false;
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.informacionUsuarios);
        // Realiza una consulta a la collecion de informacion de usuarios
        const informacionUsuario: Collection<RegistroDatosInicialesModel> | any = await quotesCollection.findOne({ idUsuario: idUsuario });
        // Valida si devuelve informacion del usuario
        if (informacionUsuario) {
            hadData = true;
        }

        return hadData;

    }

    /**
     * @author Mario Tavarez
     * @date 19/09/2021
     * @description Registra los datos iniciales del usuario tales como: Nombres, Apellidos, Calle, C.P, etc.
     * @param req 
     * @param res 
     */
    public async registrarDatosIniciales(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene el los datos del usuario a registrar
        const registroDatosIniciales: RegistroDatosInicialesModel = req.body;
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.informacionUsuarios);
        // Registra los datos iniciales del usuario
        await quotesCollection.insertOne(registroDatosIniciales);
        // Si no esta repetido entonces registra la cuenta del usuario
        try {
            res.status(200).send({ status: 'OK', message: 'Muy bien, sus datos se han registrado correctamente' });
        } catch (error) {
            logger.error(`REGISTRO DATOS INICIALES: No fue posible registrar sus datos debido a: ${error}`);
            res.status(404).send({ status: 'NOK', message: 'No fue posible registrar sus datos, intentelo más tarde nuevamente' });
        } finally {
            connection.client.close();
        }
    }
    /**
     * @author Mario Tavarez
     * @date 21/09/2021
     * @description Devuelve los datos de registro del usuario
     * @param req 
     * @param res 
     */
    public async devolverDatosRegistro(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene el id usuario
        const { idUsuario } = req.params;
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.informacionUsuarios);
        try {
            // Registra los datos iniciales del usuario
            const datosRegistro: Collection<RegistroDatosInicialesModel> | any = await quotesCollection.findOne({ idUsuario: idUsuario });
            // Valida si devuelve los datos del usuario
            if (datosRegistro) {
                res.status(200).send({ status: 'OK', datosRegistro: datosRegistro });
            } else {
                res.status(404).send({ status: 'NOK', message: `No se encontraron los datos de registro del usuario, asegurese de registrarlos` });
            }

        } catch (error) {
            logger.error(`DEVOLVER DATOS REGISTRO USUARIO: No fue posible devolver los datos de registro del usuario ${idUsuario} debido a un error inesperado: ${error}`);
            res.status(500).send({ status: 'NOK', message: 'No fue posible devolver los datos de registro del usuario debido a un error inesperado' });
        } finally {
            connection.client.close();
        }
    }

}
