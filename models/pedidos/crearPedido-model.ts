// Models
import { ProductosModel } from './../productos/productos-model';

export interface CrearPedidoModel {
    idUsuario: string;
    direccion: string;
    noInt: string;
    noExt: string;
    latitud: string;
    longitud: string;
    productos: ProductosModel[],
    total: number;
}