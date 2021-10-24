export interface HistorialUsuarioModel {
    idUsuario: string;
    idPedido: string;
    productos: any[];
    direccion: string;
    noInt: string;
    noExt: string;
    latitud: string;
    longitud: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
}