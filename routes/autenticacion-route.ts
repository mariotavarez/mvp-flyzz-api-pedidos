import { Router, Request, Response } from 'express';
// Controllers
import AutenticacionController from '../controllers/autenticacion-controller';


const autenticacionRouter = Router();

const autenticacionController = new AutenticacionController();


autenticacionRouter.post('/', autenticacionController.autenticarUsuario);

export default autenticacionRouter;
