// Log4js
import log4js from 'log4js';

export default class LogServer {

    constructor() {
    }

    /**
     * @author Mario Tavarez
     * @date 19/09/2021
     * @description Crea la configuracion del log del servidor
     */
    public async createLogServer(): Promise<void> {
        // Configuracion de log
        log4js.configure({
            appenders: { mvp: { type: "file", filename: "mvp-flyzz.log" } },
            categories: { default: { appenders: ["mvp"], level: "info" } }
          });
    }

    /**
     * @author Mario Tavarez
     * @date 19/09/2021
     * @description Devuelve la configuracion del log MVP
     * @returns 
     */
    public getLogConfigMVP(): any {
        // Obtiene la configuracion del log MVP
        const logger = log4js.getLogger("mvp");
        // Regresa el objeto logger de configuracion
        return logger;
    }



}