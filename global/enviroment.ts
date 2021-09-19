import { DatabaseModel } from './../models/database/database-model';
// SERVER PORT
export const SERVER_PORT: number = 4201;
// DATABASE CONFIG
export const DATABASE: DatabaseModel = {
    url: 'mongodb+srv://admin-flyzz:flyzzmvp2021@cluster0.pj7fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName: 'flyzz-mvp'
};
// EMAIL CONFIG
export const EMAIL_CONFIG = {
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
export const COLLECTIONS = {
    usuarios: 'usuarios',
    productos: 'productos',
    categorias: 'categorias'
};
// TOKEN
export const TOKEN: string = '229b6c3219d07afacaf781ffda3beddc0b1ee1a5e9c34b82c050dc9e0b0ea9d097e892e504df38d38440cb97b47b207c32606945e3f0b2d59566f9f0432491ca3096b381f07cefa540b8ae6a2001e51c';
// SALT
export const SALTROUNDS: number = 10;