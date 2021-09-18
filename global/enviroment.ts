import { DatabaseModel } from './../models/database/database-model';
// SERVER PORT
export const SERVER_PORT: number = 4201;
// DATABASE CONFIG
export const DATABASE: DatabaseModel = {
    url: 'mongodb+srv://admin-flyzz:flyzzmvp2021@cluster0.pj7fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName: 'flyzz-mvp'
};
// Email Config
export const EMAIL_CONFIG = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'mariojosueitq@gmail.com',
        pass: 'Madarasusanox1$'
      }

}