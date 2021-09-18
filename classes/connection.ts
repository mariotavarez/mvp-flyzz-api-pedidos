// MongoDB
import { MongoClient } from 'mongodb';
// Enviroment
import { DATABASE } from './../global/enviroment';

export default class Connection {

	// URL DB
	public url: string = DATABASE.url;
	// CLIENT
	public client = new MongoClient(this.url);


	constructor() { }

	/**
	 * @author Mario Tavarez
	 * @description Realiza la conexion a BD MongoDB
	 * @date 16/09/2021
	 */
	public async connectToDB(): Promise<void> {
		// Use connect method to connect to the server
		await this.client.connect();
	}

}
