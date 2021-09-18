import { Request } from 'express';
// Connection
import Connection from "../classes/connection";
// Databases
import { DATABASE } from './../global/enviroment';
// Models
import { AltaUsuarioModel } from './../models/usuarios/registro-model';


export default class AutenticacionService {

    constructor() { }

   

    public async autenticarUsuario(req: Request) {
        console.log('entra a peticion');

        const connection = new Connection();

        await connection.connectToDB();
        
        const database = connection.client.db("flyzz-mvp");

        const quotesCollection = database.collection('usuarios');
        console.log(req.body);
        
        quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))
    }
}