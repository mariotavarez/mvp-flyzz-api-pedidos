// Express
import { Request, Response } from "express";
// Services
import BannersService from "../services/banners-services";

export default class BannersController {

    constructor() {}


    /**
     * @author Mario Tavarez
     * @date 05/10/2021
     * @description Devuelve el listado de los banners disponibles
     * @param req 
     * @param res 
     * @returns 
     */
    public async getBanners(req: Request, res: Response) {

        const bannersService = new BannersService();

        const responseBanners = await bannersService.getBanners(res);

        return responseBanners;

    }   

}