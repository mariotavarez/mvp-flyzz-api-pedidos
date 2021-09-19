// Bcrypt
import bcrypt from 'bcrypt';
// Enviroments
import { SALTROUNDS } from '../global/enviroment';

export default class Security { 

    constructor() {}

    /**
     * @author Mario Tavarez
     * @date 19/09/2021
     * @description Devuelve el password encriptado
     * @param password 
     * @returns 
     */
    public async generateHash(password: string) { 
        // Numero de Salt Rounds
        const salt = await bcrypt.genSaltSync(SALTROUNDS);
        // Espera a que devuelve el hash del password
        const passwordHash = await bcrypt.hashSync(password, salt);
        // Devuelve el password hasheado
        return passwordHash;
    }

    /**
     * @author Mario Tavarez
     * @date 19/08/2021
     * @description Valida si el password del usuario coincide con el password hasheado
     * @param password 
     * @param passwordHash 
     * @returns 
     */
    public async decryptHash(password: string, passwordHash: string) { 
        // Obtiene un booleano dependiendo si el password del usuario coincide con el hasheado
        const passwordCorrect = await bcrypt.compareSync(password, passwordHash); 
        // Returna la respuesta de la comparacion
        return passwordCorrect;
    }
}