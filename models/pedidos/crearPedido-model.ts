// Models
import { ProductosModel } from './../productos/productos-model';

export interface CrearPedidoModel {
    idUsuario: string;
    productos: ProductosModel[],
    estatus: string;
    total: number;
    idDrone: string;
    fechaCreacion: string;
    fechaModificacion: string;
}