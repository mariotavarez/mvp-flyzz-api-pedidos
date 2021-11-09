"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALTROUNDS = exports.TOKEN = exports.COLLECTIONS_CONTROL = exports.COLLECTIONS = exports.EMAIL_CONFIG = exports.DATABASE_CONTROL = exports.DATABASE = exports.SSL_SERVER_PORT = exports.SERVER_PORT = void 0;
// SERVER PORT
exports.SERVER_PORT = 4201;
// SSL SERVER PORT
exports.SSL_SERVER_PORT = 3443;
// DATABASE CONFIG
exports.DATABASE = {
    url: 'mongodb+srv://admin-flyzz:flyzzmvp2021@cluster0.pj7fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName: 'flyzz-mvp'
};
// DATABASE CONFIG
exports.DATABASE_CONTROL = {
    url: 'mongodb+srv://admin-flyzz:flyzzmvp2021@cluster0.pj7fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName: 'flyzz-control'
};
// EMAIL CONFIG
exports.EMAIL_CONFIG = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mariojosueitq@gmail.com',
        pass: 'wbuukhfawsiwlhyn'
    }
};
// COLLECTIONS
exports.COLLECTIONS = {
    usuarios: 'usuarios',
    productos: 'productos',
    categorias: 'categorias',
    informacionUsuarios: 'informacion-usuarios',
    pedidos: 'pedidos',
    historialUsuarios: 'historial-usuarios',
    banners: 'banners',
    comentariosPedidos: 'comentarios-pedidos',
    configuraciones: 'configuraciones'
};
// COLLECTIONS CONTROL
exports.COLLECTIONS_CONTROL = {
    usuarios: 'usuarios',
};
// TOKEN
exports.TOKEN = '229b6c3219d07afacaf781ffda3beddc0b1ee1a5e9c34b82c050dc9e0b0ea9d097e892e504df38d38440cb97b47b207c32606945e3f0b2d59566f9f0432491ca3096b381f07cefa540b8ae6a2001e51c';
// SALT
exports.SALTROUNDS = 10;
