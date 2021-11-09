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
import { ObjectID } from 'mongodb';
// Models
import { CrearPedidoModel } from '../models/pedidos/crearPedido-model';
import { ActualizarPedidoModel } from '../models/pedidos/actualizarPedido-model';
import { HistorialUsuarioModel } from '../models/productos/historialUsuario-model';
// Log Server
import LogServer from '../classes/logServer';
// Log4js
import { Logger } from 'log4js';
// Services
import UsuariosService from './usuarios-services';
// Constants
import { ESTATUS_PEDIDO } from './../global/constants';
import { ComentariosPedidoModel } from '../models/pedidos/comentariosPedido-model';

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
        // Obtiene el id pedido mediante parametro
        const { idPedido } = req.params;
        // Crea la conection con BD
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
            productos: pedido.productos,
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

    /**
     * @author Mario Tavarez
     * @date 24/10/2021
     * @description Valida si existe el pedido en base a un id pedido
     * @param idPedido 
     * @param logger 
     * @param database 
     * @returns 
     */
    public async validarExistenciaPedido(idPedido: string, logger: Logger, database: any) {

        let pedido: Collection<any> | any = null;
        // Database
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.pedidos);

        try {
            // Valida si el pedido se encuentra registrado anteriormente
            pedido = await quotesCollection.findOne({ '_id': new ObjectID(idPedido) });
        } catch (error) {
            logger.error(`EXISTENCIA PEDIDO: No fue posible validar la existencia del pedido ${idPedido} debido a: ${error}`);
        }

        return pedido;
    }

    /**
     * @author Mario Tavarez
     * @date 24/10/2021
     * @description Actualiza los datos del pedido mediante el id, el estatus proviene de la peticion. Adicionalmente valida que
     *              el estatus no se encuentre como ENTREGADO para no modificar la ultima fecha de modificacion
     * @param req 
     * @param res 
     */
    public async actualizarEstatusPedidoById(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene los datos para actualizar el pedido del usuario
        const pedido: ActualizarPedidoModel = req.body;
        // Crea la conection con BD
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.pedidos);
        try {
            // Valida que el estatus entrante sea VOLANDO A TU DOMICILIO o ENTREGADO
            if (pedido.estatus !== ESTATUS_PEDIDO.volandoATuDomicilio && pedido.estatus !== ESTATUS_PEDIDO.entregado) {
                // Cierra la conexion de BD
                connection.client.close();
                // No procede el estatus si no se encuentra dentro de los permitidos
                res.status(300).send({ status: 'NOK', message: `El estatus ${pedido.estatus} no es válido` });
            }
            // Valida si el pedido se encuentra registrado anteriormente
            const datosPedido: Collection<any> | any = await this.validarExistenciaPedido(pedido.idPedido, logger, database);
            // Si existe el pedido entonces procede a validar que no se encuentre entregado
            if (datosPedido !== null) {
                const { estatus } = datosPedido;
                // Valida que el estatus no se encuentre entregado para no actualizar datos y afectar la ultima fecha de modificacion
                if (estatus === 'ENTREGADO') {
                    res.status(300).send({ status: 'NOK', message: `Este número de pedido no se puede actualizar ya que se encuentra actualmente como ENTREGADO` });
                } else {
                    // Se procede a actualizar los datos del pedido
                    const actualizarPedido: Collection<any> | any = await quotesCollection.findOneAndUpdate({ '_id': new ObjectID(pedido.idPedido) }, { $set: { estatus: pedido.estatus, idDrone: '38484TTJ39393932D8', fechaModificacion: new Date() } });
                    // Valida que se haya actualizado el pedido
                    if (actualizarPedido) {
                        res.status(200).send({ status: 'OK', message: `El estatus del pedido se ha actualizado a ${pedido.estatus} correctamente` });
                    } else {
                        res.status(300).send({ status: 'NOK', message: `No fue posible actualizar el estatus del pedido debido` });
                    }
                }
            } else {
                res.status(404).send({ status: 'NOK', message: `Este número de pedido no se encuentra registrado` });
            }
        } catch (error) {
            res.status(500).send({ status: 'NOK', message: `No fue posible actualizar el estatus debido a un error inesperado` });
            logger.error(`ACTUALIZAR PEDIDO: No fue posible actualizar el pedido ${pedido.idPedido} a estatus ${pedido.estatus} debido a: ${error}`);
        } finally {
            connection.client.close();
        }
    }


    /**
     * @author Mario Tavarez
     * @date 23/10/2021
     * @description Devuelve el historial de movimientos del usuario mediante el id usuario
     * @param req 
     * @param res 
     */
    public async getHistorialMovimientosByUsuario(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene el id usuario mediante parametro
        const { idUsuario } = req.params;
        // Crea la conection con BD
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Pedidos
        const quotesCollection = database.collection(COLLECTIONS.historialUsuarios);
        try {
            // Inicializa la clase de usuarios
            const usuariosService = new UsuariosService();
            // Valida si el usuario se encuentra registrado
            const usuario = await usuariosService.getCorreoUsuarioById(idUsuario, database, logger);
            // Valida si devuelve datos del usuario
            if (usuario !== null) {
                const historialMovimientos: Collection<any> | any = await quotesCollection.find({ idUsuario: idUsuario }).toArray();
                // Valida si encuentra historial de movimientos del usuario
                if (historialMovimientos) {
                    res.status(200).send({ status: 'OK', historialMovimientos: historialMovimientos });
                } else {
                    res.status(200).send({ status: 'OK', historialMovimientos: [] })
                }
            } else {
                res.status(404).send({ status: 'NOK', message: 'Este usuario no se encuentra registrado' });
            }
        } catch (error) {
            res.status(500).send({ status: 'NOK', message: `No fue posible devolver el historial de movimientos del usuario debido a un error desconocido` });
            logger.error(`GET HISTORIAL MOVIMIENTOS BY USUARIO: No fue posible devolver el historial de movimientos del usuario ${idUsuario} debido a: ${error}`);
        } finally {
            connection.client.close();
        }

    }
    /**
     * @author Mario Tavarez
     * @date 28/10/2021
     * @description Devuelve el listado de comentarios de los usuarios
     * @param req 
     * @param res 
     */
    public async getComentarios(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Crea la conection con BD
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Comentarios
        const quotesCollection = database.collection(COLLECTIONS.comentariosPedidos);
        try {
            // Valida si devuelve los comentarios de los pedidos
            const comentarios: Collection<any> | any = await quotesCollection.find({}).toArray();
            // Valida si encuentra los comentarios
            if (comentarios) {
                res.status(200).send({ status: 'OK', comentarios: comentarios });
            } else {
                res.status(200).send({ status: 'OK', comentarios: [] })
            }
        } catch (error) {
            res.status(500).send({ status: 'NOK', message: `No fue posible devolver el listado de comentarios de los pedidos` });
            logger.error(`GET COMENTARIOS: No fue poisible devolver el listado de comentarios debido a: ${error}`);
        } finally {
            connection.client.close();
        }
    }

    /**
     * @author Mario Tavarez
     * @date 24/10/2021
     * @description Crea el comentario del usuario en base a la experiencia del pedido
     * @param req 
     * @param res 
     */
    public async crearComentarioPedido(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Obtiene el id usuario mediante parametro
        const comentariosPedido: ComentariosPedidoModel = req.body;
        // Crea la conection con BD
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Comentarios Pedidos
        const quotesCollection = database.collection(COLLECTIONS.comentariosPedidos);
        try {
            // Valida la existencia del pedido mediante el id pedido
            const datosPedido: Collection<any> | any = await this.validarExistenciaPedido(comentariosPedido.idPedido, logger, database);
            // valida que el usuario exista
            const usuariosService = new UsuariosService();
            // Obtiene los datos del usuario
            const usuario = await usuariosService.getCorreoUsuarioById(comentariosPedido.usuario.idUsuario, database, logger);
            // Valida que el usuario exista
            if (usuario === null) {
                return res.status(404).send({ status: 'NOK', message: `Este usuario no se encuentra registrado` });
            }
            // Valida que el pedido exista
            if (datosPedido !== null) {
                // Registra el comentario asociado al pedido
                await quotesCollection.insertOne({ comentariosPedido });
                res.status(200).send({ status: 'OK', message: `Muchas gracias por tus comentarios, tu opinión es muy importante para nosotros` });
            } else {
                res.status(404).send({ status: 'NOK', message: `Este número de pedido no esta registrado` });
            }

        } catch (error) {
            res.status(500).send({ status: 'NOK', message: `No fue posible crear su comentario debido a que ocurrió un error inesperado` });
            logger.error(`CREAR COMENTARIO PEDIDO: No fue posible crear el comentario del usuario ${comentariosPedido.usuario.idUsuario} debido a: ${error}`);
        } finally {
            connection.client.close();
        }
    }

    /**
     * @author Mario Tavarez
     * @date 08/11/2021
     * @description Devuelve las configuraciones del sistema
     * @param req 
     * @param res 
     */
    public async getConfiguraciones(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Crea la conection con BD
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion Configuraciones
        const quotesCollection = database.collection(COLLECTIONS.configuraciones);
        try {
            // Valida si devuelve las configuraciones del API FLYZZ
            const configuraciones: Collection<any> | any = await quotesCollection.find({}).toArray();
            // Valida si encuentra las configuraciones
            if (configuraciones) {
                res.status(200).send({ status: 'OK', configuraciones: configuraciones });
            } else {
                res.status(200).send({ status: 'NOK', message: 'No fue posible devolver las configuraciones' })
            }
        } catch (error) {
            res.status(500).send({ status: 'NOK', message: `No fue posible devolver las configuraciones` });
            logger.error(`GET CONFIGURACIONES: No fue poisible devolver las configuraciones debido a: ${error}`);
        } finally {
            connection.client.close();
        }

    }
}
