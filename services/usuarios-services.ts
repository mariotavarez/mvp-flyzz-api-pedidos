import { PLANTILLAS_CORREO } from '../global/constants';
// Connection DB
import { Request, Response } from "express";
import { Collection } from "mongodb";
// Connection Database
import Connection from "../classes/connection";
// Database
import { DATABASE } from "../global/enviroment";
// Models
import { AltaUsuarioModel } from "../models/usuarios/registro-model";
import Mail from "../utils/mail";
import { UsuarioCuentaModel } from '../models/usuarios/usuarioCuenta-model';
import Security from '../classes/security';

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

        // Obtiene el los datos del usuario
        const altaUsuario: AltaUsuarioModel = req.body;
        // Inicializa el objeto de BD de MongoDB
        const connection = new Connection();
        // Espera a que conecte la BD
        await connection.connectToDB();
        // Database
        const database = connection.client.db(DATABASE.dbName);
        // Collecion
        const quotesCollection = database.collection('usuarios');
        // Valida si ya se ha registrado anteriormente el correo del usuario
        const idRepeated: boolean = await this.validarExistenciaCorreo(altaUsuario.correo, quotesCollection);
        // Si no esta repetido entonces registra la cuenta del usuario
        if (!idRepeated) {
            // Instancia de la clase de Security
            const security = new Security();
            // Generacion de nuevo password
            altaUsuario.password = await security.encryptPassword(altaUsuario.password);
            // Realiza la insercion en la coleccion de usuarios
            await quotesCollection.insertOne(altaUsuario);
            try {
                // Inicializa Correo
                const mail = new Mail();
                // Envia el email al usuario registrado
                await mail.sendMail(altaUsuario.correo, PLANTILLAS_CORREO.registro).then(email => {
                    res.status(200).send({ status: 'OK', message: 'Usuario dado de alta correctamente' });
                }).catch(error => {
                    console.log(error.message);
                    res.status(200).send({ status: 'NOK', message: `Usuario dada de alta correctamente, sin enbargo no fue posible enviar el correo de registro a la dirección de correo ${altaUsuario.correo}` });
                });
            } catch (error) {
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

}
