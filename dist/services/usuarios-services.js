"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Enviroment
var enviroment_1 = require("./../global/enviroment");
// Constants
var constants_1 = require("../global/constants");
// Connection Database
var connection_1 = __importDefault(require("../classes/connection"));
// Database
var enviroment_2 = require("../global/enviroment");
// Utils
var mail_1 = __importDefault(require("../utils/mail"));
// Security
var security_1 = __importDefault(require("../classes/security"));
// Log Server
var logServer_1 = __importDefault(require("../classes/logServer"));
var UsuariosService = /** @class */ (function () {
    function UsuariosService() {
    }
    /**
    * @author Mario Tavarez
    * @date 17/09/2021
    * @description Registra los datos del usuario
    * @param req
    * @param res
    */
    UsuariosService.prototype.altaUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, altaUsuario, connection, database, quotesCollection, idRepeated, security, _a, mail, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        altaUsuario = req.body;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _b.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.usuarios);
                        return [4 /*yield*/, this.validarExistenciaCorreo(altaUsuario.correo, quotesCollection)];
                    case 2:
                        idRepeated = _b.sent();
                        if (!!idRepeated) return [3 /*break*/, 10];
                        security = new security_1.default();
                        // Generacion de nuevo password
                        _a = altaUsuario;
                        return [4 /*yield*/, security.generateHash(altaUsuario.password)];
                    case 3:
                        // Generacion de nuevo password
                        _a.password = _b.sent();
                        // Realiza la insercion en la coleccion de usuarios
                        return [4 /*yield*/, quotesCollection.insertOne(altaUsuario)];
                    case 4:
                        // Realiza la insercion en la coleccion de usuarios
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, 8, 9]);
                        mail = new mail_1.default();
                        // Envia el email al usuario registrado
                        return [4 /*yield*/, mail.sendMail(altaUsuario.correo, constants_1.PLANTILLAS_CORREO.registro).then(function (email) {
                                res.status(200).send({ status: 'OK', message: 'Felicidades, tu cuenta se ha registrado exitosamente, se le enviará un correo de bienvenida a la brevedad' });
                            }).catch(function (error) {
                                logger.error("ALTA USUARIOS: Usuario dada de alta correctamente, sin enbargo no fue posible enviar el correo de registro a la direcci\u00F3n de correo " + altaUsuario.correo + " debido a " + error.message);
                                res.status(200).send({ status: 'NOK', message: "Usuario dada de alta correctamente, sin enbargo no fue posible enviar el correo de registro a la direcci\u00F3n de correo " + altaUsuario.correo });
                            })];
                    case 6:
                        // Envia el email al usuario registrado
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        error_1 = _b.sent();
                        logger.error("ALTA USUARIOS: No fue posible registrar los datos de la cuenta " + altaUsuario.correo + " debido a " + error_1);
                        res.status(404).send({ status: 'NOK', message: 'No fue posible registrar sus datos' });
                        return [3 /*break*/, 9];
                    case 8:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        res.status(200).send({ status: 'NOK', message: "El correo " + altaUsuario.correo + " ya se ha dado de alta anteriormente, intente con uno diferente" });
                        _b.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 17/09/2021
     * @description Valida si el correo ya se ha registrado anteriormente
     * @param correo
     * @param quotesCollection
     * @returns
     */
    UsuariosService.prototype.validarExistenciaCorreo = function (correo, quotesCollection) {
        return __awaiter(this, void 0, void 0, function () {
            var isRepeated, registroCorreo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isRepeated = false;
                        return [4 /*yield*/, quotesCollection.findOne({ correo: correo })];
                    case 1:
                        registroCorreo = _a.sent();
                        // Valida si devuelve informacion
                        if (registroCorreo) {
                            // Si el correo coincide con el correo ingresado entonces el correo esta repetido
                            if (registroCorreo.correo === correo) {
                                isRepeated = true;
                            }
                        }
                        return [2 /*return*/, isRepeated];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 19/09/2021
     * @description Valida si tiene datos registrados el usuario, si tiene datos entonces regresa true, de lo contrario false ya que es la primera vez que
     *              el usuario ingresara sus datos
     * @param idUsuario
     * @param database
     * @returns
     */
    UsuariosService.prototype.validarRegistroDatosInicialesUsuario = function (idUsuario, database) {
        return __awaiter(this, void 0, void 0, function () {
            var hadData, quotesCollection, informacionUsuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hadData = false;
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.informacionUsuarios);
                        return [4 /*yield*/, quotesCollection.findOne({ idUsuario: idUsuario })];
                    case 1:
                        informacionUsuario = _a.sent();
                        // Valida si devuelve informacion del usuario
                        if (informacionUsuario) {
                            hadData = true;
                        }
                        return [2 /*return*/, hadData];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 19/09/2021
     * @description Registra los datos iniciales del usuario tales como: Nombres, Apellidos, Calle, C.P, etc.
     * @param req
     * @param res
     */
    UsuariosService.prototype.registrarDatosIniciales = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, registroDatosIniciales, connection, database, quotesCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        registroDatosIniciales = req.body;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.informacionUsuarios);
                        // Registra los datos iniciales del usuario
                        return [4 /*yield*/, quotesCollection.insertOne(registroDatosIniciales)];
                    case 2:
                        // Registra los datos iniciales del usuario
                        _a.sent();
                        // Si no esta repetido entonces registra la cuenta del usuario
                        try {
                            res.status(200).send({ status: 'OK', message: 'Muy bien, sus datos se han registrado correctamente' });
                        }
                        catch (error) {
                            logger.error("REGISTRO DATOS INICIALES: No fue posible registrar sus datos debido a: " + error);
                            res.status(404).send({ status: 'NOK', message: 'No fue posible registrar sus datos, intentelo más tarde nuevamente' });
                        }
                        finally {
                            connection.client.close();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 21/09/2021
     * @description Devuelve los datos de registro del usuario
     * @param req
     * @param res
     */
    UsuariosService.prototype.devolverDatosRegistro = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, idUsuario, connection, database, quotesCollection, datosRegistro, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        idUsuario = req.params.idUsuario;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.informacionUsuarios);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, quotesCollection.findOne({ idUsuario: idUsuario })];
                    case 3:
                        datosRegistro = _a.sent();
                        // Valida si devuelve los datos del usuario
                        if (datosRegistro) {
                            res.status(200).send({ status: 'OK', datosRegistro: datosRegistro });
                        }
                        else {
                            res.status(404).send({ status: 'NOK', message: "No se encontraron los datos de registro del usuario, asegurese de registrarlos" });
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _a.sent();
                        logger.error("DEVOLVER DATOS REGISTRO USUARIO: No fue posible devolver los datos de registro del usuario " + idUsuario + " debido a un error inesperado: " + error_2);
                        res.status(500).send({ status: 'NOK', message: 'No fue posible devolver los datos de registro del usuario debido a un error inesperado' });
                        return [3 /*break*/, 6];
                    case 5:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 10/10/2021
     * @description Actualiza los datos del usuario
     * @param req
     * @param res
     */
    UsuariosService.prototype.actualizarDatosRegistro = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, datosUsuario, connection, database, quotesCollection, datosIniciales, actualizacionDatos, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        datosUsuario = req.body;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.informacionUsuarios);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, 8, 9]);
                        return [4 /*yield*/, quotesCollection.findOne({ 'idUsuario': datosUsuario.idUsuario })];
                    case 3:
                        datosIniciales = _a.sent();
                        if (!datosIniciales) return [3 /*break*/, 5];
                        return [4 /*yield*/, quotesCollection.findOneAndUpdate({ 'idUsuario': datosUsuario.idUsuario }, { $set: datosUsuario })];
                    case 4:
                        actualizacionDatos = _a.sent();
                        // Valida si se han actualzado los datos del usuario correctamente
                        if (actualizacionDatos) {
                            res.status(200).send({ status: 'OK', message: "Sus datos se han actualizado correctamente" });
                        }
                        else {
                            res.status(300).send({ status: 'NOK', message: "No fue posible actualizar sus datos ya que su usuario no ha sido dado de alta" });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(404).send({ status: 'NOK', message: "Este usuario no se encuentra registrado, es necesario estar registrado para poder realizar la actualizaci\u00F3n de sus datos" });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        error_3 = _a.sent();
                        console.log(error_3);
                        logger.error("ACTUALIZAR DATOS REGISTRO USUARIO: No fue posible actualizar los datos de registro del usuario " + datosUsuario.idUsuario + " debido a un error inesperado: " + error_3);
                        res.status(500).send({ status: 'NOK', message: 'No fue posible actualizar los datos de registro debido a un error inesperado' });
                        return [3 /*break*/, 9];
                    case 8:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return UsuariosService;
}());
exports.default = UsuariosService;
