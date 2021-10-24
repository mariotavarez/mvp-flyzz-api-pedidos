// Enviroment
import { COLLECTIONS } from './../global/enviroment';
// Express
import { Request, Response } from "express";
// Constants
import { PLANTILLAS_CORREO } from '../global/constants';
// Connection DB
import { Collection, Db, ObjectID } from "mongodb";
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
                    res.status(200).send({ status: 'OK', message: 'Felicidades, tu cuenta se ha registrado exitosamente, se le enviará un correo de bienvenida a la brevedad' });
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
        // Obtiene los datos del usuario
        const usuario = await this.getDatosUsuarioById(idUsuario, logger);
        // Valida que no sea nulo la devolucion de los datos del usuario
        if (usuario !== null) {
            res.status(200).send({ status: 'OK', datosRegistro: usuario });
        } else {
            res.status(404).send({ status: 'NOK', message: `No se encontraron los datos de este usuario` });
        }
    }

    /**
     * @author Mario Tavarez
     * @date Devuelve los datos del usuario por id
     * @date 23/10/2021
     * @param idUsuario 
     * @param logger 
     * @returns 
     */
    public async getDatosUsuarioById(idUsuario: string, logger: Logger) {
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Inicializa los datos del usuario
        let usuario: Collection<RegistroDatosInicialesModel> | any = null;
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.informacionUsuarios);
        try {
            // Registra los datos iniciales del usuario
            usuario = await quotesCollection.findOne({ idUsuario: idUsuario });
        } catch (error) {
            logger.error(`GET DATOS USUARIO BY ID: No fue posible devolver los datos del usuario ${idUsuario} debido a un error inesperado: ${error}`);
        } finally {
            connection.client.close();
        }

        return usuario;
    }
    /**
     * @author Mario Tavarez
     * @date 10/10/2021
     * @description Actualiza los datos del usuario
     * @param req 
     * @param res 
     */
    public async actualizarDatosRegistro(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene el id usuario
        const datosUsuario: RegistroDatosInicialesModel = req.body;
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS.informacionUsuarios);
        try {
            // Se procede a actualizar los datos del usuario
            const datosIniciales: Collection<RegistroDatosInicialesModel> | any = await quotesCollection.findOne({ 'idUsuario': datosUsuario.idUsuario });
            // Valida que exista el usuario
            if (datosIniciales) {
                // Valida si se han actualzado los datos del usuario correctamente
                // Se procede a actualizar los datos del usuario
                const actualizacionDatos: Collection<RegistroDatosInicialesModel> | any = await quotesCollection.findOneAndUpdate({ 'idUsuario': datosUsuario.idUsuario }, { $set: datosUsuario });
                // Valida si se han actualzado los datos del usuario correctamente
                if (actualizacionDatos) {
                    res.status(200).send({ status: 'OK', message: `Sus datos se han actualizado correctamente` });
                } else {
                    res.status(300).send({ status: 'NOK', message: `No fue posible actualizar sus datos ya que su usuario no ha sido dado de alta` });
                }
            } else {
                res.status(404).send({ status: 'NOK', message: `Este usuario no se encuentra registrado, es necesario estar registrado para poder realizar la actualización de sus datos` });
            }
        } catch (error) {
            console.log(error);

            logger.error(`ACTUALIZAR DATOS REGISTRO USUARIO: No fue posible actualizar los datos de registro del usuario ${datosUsuario.idUsuario} debido a un error inesperado: ${error}`);
            res.status(500).send({ status: 'NOK', message: 'No fue posible actualizar los datos de registro debido a un error inesperado' });
        } finally {
            connection.client.close();
        }

    }


    /**
     * @author Mario Tavarez
     * @description Devuelve todos los usuarios registrados
     * @date 17/10/2021
     * @param req 
     * @param res 
     */
    public async getUsuariosRegistrados(res: Response) {
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
        const quotesCollection = database.collection(COLLECTIONS.informacionUsuarios);

        try {
            // Se procede a actualizar los datos del usuario
            let datosUsuarios: Collection<any> | any = await quotesCollection.find({}).toArray();
            // Valida que exista el usuario
            if (datosUsuarios) {
                let informacionUsuario: any[] = [];
                // Recorre los datos obtenidos del usuario
                for (const usuario of datosUsuarios) {
                    // let indice = 0;
                    // Consulta el correo del usuario
                    const correo = await this.getCorreoUsuarioById(usuario.idUsuario, database, logger);
                    // Crea un objeto auxiliar para guardar los datos del usuario y agregar el correo
                    let informacionUsuarioAuxiliar = {
                        _id: usuario._id,
                        nombres: usuario.nombres,
                        apellidoPaterno: usuario.apellidoPaterno,
                        apellidoMaterno: usuario.apellidoMaterno,
                        fechaNacimiento: usuario.fechaNacimiento,
                        sexo: usuario.sexo,
                        calle: usuario.calle,
                        noExt: usuario.noExt,
                        noInt: usuario.noInt,
                        cp: usuario.cp,
                        latitud: usuario.latitud,
                        longitud: usuario.longitud,
                        idUsuario: usuario.idUsuario,
                        fechaCreacion: usuario.fechaCreacion,
                        fechaModificacion: usuario.fechaModificacion,
                        correo: correo
                    }
                    // Setea la informacion auxiliar y la agrega al objeto definitivo que se enviara por response
                    informacionUsuario.push(informacionUsuarioAuxiliar);
                }
                // Valida si se han actualzado los datos del usuario correctamente
                res.status(200).send({ status: 'OK', usuarios: informacionUsuario });
            } else {
                res.status(404).send({ status: 'NOK', message: `Este usuario no se encuentra registrado, es necesario estar registrado para poder realizar la actualización de sus datos` });
            }
        } catch (error) {
            logger.error(`GET USUARIOS REGISTRADOS: No fue posible devolver los usuarios registrados debido a: ${error}`);
            res.status(500).send({ status: 'NOK', message: 'No fue posible devolver los usuarios registrados debido a un error inesperado' });
        } finally {
            connection.client.close();
        }
    }

    /**
     * @author Mario Tavarez
     * @date 17/10/2021
     * @description Devuelve el correo del usuario
     * @param idUsuario 
     * @param database 
     * @param logger 
     */
    public async getCorreoUsuarioById(idUsuario: string, database: Db, logger: Logger) {
        // Collection
        const quotesCollection = database.collection(COLLECTIONS.usuarios);
        let correoUsuario = null;
        try {
            const datosUsuario: Collection<any> | any = await quotesCollection.findOne({ _id: new ObjectID(idUsuario) });
            // Valida si existe la informacion del usuario
            if (datosUsuario) {
                correoUsuario = datosUsuario.correo;
            } else {
                logger.error(`GET CORREO BY ID: No fue posible recuperar el correo del usuario ${idUsuario} debido a que no se encuentra registrado`);
            }
        } catch (error) {
            logger.error(`GET CORREO BY ID: No fue posible recuperar el correo del usuario ${idUsuario} debido a: ${error}`);
        }
        return correoUsuario;
    }


}
