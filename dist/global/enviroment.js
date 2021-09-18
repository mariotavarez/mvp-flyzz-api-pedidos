"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_CONFIG = exports.DATABASE = exports.SERVER_PORT = void 0;
// SERVER PORT
exports.SERVER_PORT = 4201;
// DATABASE CONFIG
exports.DATABASE = {
    url: 'mongodb+srv://admin-flyzz:flyzzmvp2021@cluster0.pj7fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName: 'flyzz-mvp'
};
// Email Config
exports.EMAIL_CONFIG = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mariojosueitq@gmail.com',
        pass: 'Madarasusanox1$'
    }
};
