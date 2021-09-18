// Express
import express from "express";
// Enviroment Configuration
import { SERVER_PORT } from "../global/enviroment";


export default class Server {

	// Application
	public app: express.Application;
	// Port
	public port: number;

	constructor() {
		// Inicializar App
		this.app = express();
		// Inicializar Port
		this.port = SERVER_PORT;
	}

	/**
	 * @author Mario Tavarez
	 * @date 11/09/2021
	 * @description Recibe un callback, y permite iniciar la 	 * aplicacion en el puerto designado
	 */
	public start(callback: any) {
		this.app.listen(this.port, callback);
	}


}
