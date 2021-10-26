// Models
import { ProductosModel } from '../productos/productos-model';

export interface ComentariosPedidoModel {
    usuario: {
        idUsuario: string;
        nombres: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
    },
    idPedido: string;
    puntuacion: number,
    comentarios: string;
}