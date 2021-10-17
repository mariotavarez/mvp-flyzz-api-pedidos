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
// Security
import Security from '../../classes/security';
// Models
import { usuarioControlModel } from '../../models/control/usuarios/usuario-control-model';
import { AutenticacionModel } from '../../models/autenticacion/autenticacion-model';
// Log Server
import LogServer from '../../classes/logServer';
// Log4js
import { Logger } from 'log4js';
// Middleware
import Token from '../../middlewares/token';

export default class AutenticacionControlService {

    constructor() { }

    /**
     * @author Mario Tavarez
     * @date 16/10/2021
     * @description Autentica al usuario por medio de el correo y el password
     * @param req 
     * @param res 
     */
    public async autenticarUsuario(req: Request, res: Response) {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE_CONTROL.dbName);
        // Autenticacion Usuario
        const autenticacion: AutenticacionModel = req.body;
        // Collecion
        const quotesCollection = database.collection(COLLECTIONS_CONTROL.usuarios);
        // Devuelve el usuario por medio de correo y password
        const usuario: Collection<any> | any = await quotesCollection.findOne({ correo: autenticacion.correo });
        try {
            // Valida si existen productos registrados
            if (usuario) {
                // Instancia de la clase security
                const security = new Security();
                // Valida si el password del usuario coincide con el password hasheado
                const passwordCorrect = await security.decryptHash(autenticacion.password, usuario.password);
                // Valida si la contraseña es correcta
                if (passwordCorrect) {
                    // Inicializar clase Token
                    const token = new Token();
                    // Generar token de usuario
                    const tokenGenerate = await token.generateToken(autenticacion);
                    const informacionUsuario: usuarioControlModel = {
                        idUsuario: usuario._id.toString(),
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                        apellidoPaterno: usuario.apellidoPaterno,
                        apellidoMaterno: usuario.apellidoMaterno,
                        imagen: usuario.imagen,
                        fechaCreacion: usuario.fechaCreacion
                    };
                    // Enviar token de usuario
                    res.status(200).send({ status: 'OK', message: 'Credenciales correctas', token: tokenGenerate, informacionUsuario });
                } else {
                    res.status(300).send({ status: 'NOK', message: 'Las credenciales son incorrectas' });
                }
            } else {
                res.status(404).send({ status: 'NOK', message: `El correo ${autenticacion.correo} no se encuentra registrado` });
            }

        } catch (error) {
            logger.error(`No fue posible autenticar la cuenta ${autenticacion.correo} debido a: ${error}`);
            res.status(404).send({ status: 'NOK', message: `No fue posible autenticar su cuenta debido a ${error}` });
        } finally {
            connection.client.close();
        }
    }

}
