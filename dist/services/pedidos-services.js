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
// Connection Database
var connection_1 = __importDefault(require("../classes/connection"));
// Database
var enviroment_2 = require("../global/enviroment");
var mongodb_1 = require("mongodb");
// Log Server
var logServer_1 = __importDefault(require("../classes/logServer"));
// Services
var usuarios_services_1 = __importDefault(require("./usuarios-services"));
// Constants
var constants_1 = require("./../global/constants");
var PedidosService = /** @class */ (function () {
    function PedidosService() {
    }
    /**
    * @author Mario Tavarez
    * @date 19/10/2021
    * @description Devuelve el listado de pedidos de los usuarios
    */
    PedidosService.prototype.getPedidos = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, connection, database, quotesCollection, pedidos, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.pedidos);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, quotesCollection.find({}).toArray()];
                    case 3:
                        pedidos = _a.sent();
                        // Valida si devuelve pedidos
                        if (pedidos.length > 0) {
                            res.status(200).send({ status: 'OK', pedidos: pedidos });
                        }
                        else {
                            res.status(200).send({ status: 'OK', pedidos: [] });
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        logger.error("GET PEDIDOS: No fue posible devolver el listado de pedidos debido a: " + error_1);
                        res.status(500).send({ status: 'NOK', message: "No fue posible devolver el listado de pedidos debido a: " + error_1 });
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
    * @date 17/09/2021
    * @description Crea el pedido del usuario y lo registra en el historial de pedidos del usuario
    * @param req
    * @param res
    */
    PedidosService.prototype.crearPedido = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, pedido, crearPedido, connection, database, quotesCollection, usuariosService, usuarioRegistrado, idPedido, movimientoHistorialRegistered, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        pedido = req.body;
                        crearPedido = {
                            idUsuario: pedido.idUsuario,
                            productos: pedido.productos,
                            total: pedido.total,
                            direccion: pedido.direccion,
                            noExt: pedido.noExt,
                            noInt: pedido.noInt,
                            latitud: pedido.latitud,
                            longitud: pedido.longitud,
                            estatus: constants_1.ESTATUS_PEDIDO.enProceso,
                            idDrone: null,
                            fechaCreacion: new Date(),
                            fechaModificacion: new Date()
                        };
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.pedidos);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 9, 10, 11]);
                        usuariosService = new usuarios_services_1.default();
                        return [4 /*yield*/, usuariosService.getCorreoUsuarioById(pedido.idUsuario, database, logger)];
                    case 3:
                        usuarioRegistrado = _a.sent();
                        if (!(usuarioRegistrado !== null)) return [3 /*break*/, 7];
                        return [4 /*yield*/, quotesCollection.insertOne(crearPedido)];
                    case 4: return [4 /*yield*/, (_a.sent()).insertedId];
                    case 5:
                        idPedido = _a.sent();
                        return [4 /*yield*/, this.crearMovimientoHistorial(crearPedido, idPedido.toString(), database)];
                    case 6:
                        movimientoHistorialRegistered = _a.sent();
                        // Si se creó el pedido y el movimiento en el historial del usuario entonces todo se registró correctamente
                        if (idPedido && movimientoHistorialRegistered) {
                            res.status(200).send({ status: 'OK', message: "Su pedido ha sido recibido, en breve usted disfrutar\u00E1 de la mejor experiencia de delivery cortes\u00EDa de FLYZZ", idPedido: idPedido });
                        }
                        if (idPedido && !movimientoHistorialRegistered) {
                            res.status(200).send({ status: 'OK', message: "Su pedido ha sido recibido, en breve usted disfrutar\u00E1 de la mejor experiencia de delivery cortes\u00EDa de FLYZZ", idPedido: idPedido });
                            logger.error("CREAR PEDIDO: Pedido creado correctamente para el usuario " + crearPedido.idUsuario + ", sin embargo, no fue posible registrar el movimiento en la colecci\u00F3n de historial de usuarios");
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        logger.info("CREAR PEDIDO: El usuario " + pedido.idUsuario + " no se encuentra registrado");
                        res.status(404).send({ status: 'NOK', message: "Este usuario no se encuentra registrado" });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        error_2 = _a.sent();
                        logger.error("CREAR PEDIDO: No fue posible crear el pedido del usuario " + crearPedido.idUsuario + " debido a: " + error_2);
                        res.status(500).send({ status: 'NOK', message: "No fue posible crear su pedido, por favor vuelva a intentarlo en unos minutos" });
                        return [3 /*break*/, 11];
                    case 10:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 23/10/2021
     * @descripton Devuelve el estatus del pedido
     * @param req
     * @param res
     */
    PedidosService.prototype.getEstatusPedidoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, idPedido, connection, database, quotesCollection, pedido, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        idPedido = req.params.idPedido;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.pedidos);
                        if (!(idPedido.length <= 24)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, quotesCollection.findOne({ _id: new mongodb_1.ObjectID(idPedido) })];
                    case 3:
                        pedido = _a.sent();
                        // Valida si devuelve pedidos
                        if (pedido) {
                            res.status(200).send({ status: 'OK', estatusPedido: pedido.estatus });
                        }
                        else {
                            res.status(404).send({ status: 'NOK', message: "Este pedido no ha sido registrado" });
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_3 = _a.sent();
                        logger.error("GET ESTATUS PEDIDO BY ID: Occurr\u00F3 un error al devolver el estatus del pedido " + idPedido + " debido a: " + error_3);
                        res.status(500).send({ status: 'NOK', message: "No fue posible devolver el estatus del pedido debido a un error inesperado" });
                        return [3 /*break*/, 6];
                    case 5:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        res.status(300).send({ status: 'NOK', message: "El n\u00FAmero de pedido no es v\u00E0lido" });
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 22/09/2021
     * @description Agrega un movimiento al historial del usuario
     * @param pedido
     * @param idPedido
     * @param database
     * @returns
     */
    PedidosService.prototype.crearMovimientoHistorial = function (pedido, idPedido, database) {
        return __awaiter(this, void 0, void 0, function () {
            var isCreated, quotesCollection, historialUsuario, isInserted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isCreated = false;
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.historialUsuarios);
                        historialUsuario = {
                            idUsuario: pedido.idUsuario,
                            idPedido: idPedido,
                            productos: pedido.productos,
                            direccion: pedido.direccion,
                            noExt: pedido.noExt,
                            noInt: pedido.noInt,
                            latitud: pedido.latitud,
                            longitud: pedido.longitud,
                            fechaCreacion: new Date(),
                            fechaModificacion: new Date()
                        };
                        return [4 /*yield*/, quotesCollection.insertOne(historialUsuario)];
                    case 1:
                        isInserted = _a.sent();
                        // Valida si se ha insertado el historial del usuario
                        if (isInserted) {
                            isCreated = true;
                        }
                        return [2 /*return*/, isCreated];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 24/10/2021
     * @description Valida si existe el pedido en base a un id pedido
     * @param idPedido
     * @param logger
     * @param database
     * @returns
     */
    PedidosService.prototype.validarExistenciaPedido = function (idPedido, logger, database) {
        return __awaiter(this, void 0, void 0, function () {
            var pedido, quotesCollection, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedido = null;
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.pedidos);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, quotesCollection.findOne({ '_id': new mongodb_1.ObjectID(idPedido) })];
                    case 2:
                        // Valida si el pedido se encuentra registrado anteriormente
                        pedido = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        logger.error("EXISTENCIA PEDIDO: No fue posible validar la existencia del pedido " + idPedido + " debido a: " + error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, pedido];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 24/10/2021
     * @description Actualiza los datos del pedido mediante el id, el estatus proviene de la peticion. Adicionalmente valida que
     *              el estatus no se encuentre como ENTREGADO para no modificar la ultima fecha de modificacion
     * @param req
     * @param res
     */
    PedidosService.prototype.actualizarEstatusPedidoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, pedido, connection, database, quotesCollection, datosPedido, estatus, actualizarPedido, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        pedido = req.body;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.pedidos);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 9, 10, 11]);
                        // Valida que el estatus entrante sea VOLANDO A TU DOMICILIO o ENTREGADO
                        if (pedido.estatus !== constants_1.ESTATUS_PEDIDO.volandoATuDomicilio && pedido.estatus !== constants_1.ESTATUS_PEDIDO.entregado) {
                            // Cierra la conexion de BD
                            connection.client.close();
                            // No procede el estatus si no se encuentra dentro de los permitidos
                            res.status(300).send({ status: 'NOK', message: "El estatus " + pedido.estatus + " no es v\u00E1lido" });
                        }
                        return [4 /*yield*/, this.validarExistenciaPedido(pedido.idPedido, logger, database)];
                    case 3:
                        datosPedido = _a.sent();
                        if (!(datosPedido !== null)) return [3 /*break*/, 7];
                        estatus = datosPedido.estatus;
                        if (!(estatus === 'ENTREGADO')) return [3 /*break*/, 4];
                        res.status(300).send({ status: 'NOK', message: "Este n\u00FAmero de pedido no se puede actualizar ya que se encuentra actualmente como ENTREGADO" });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, quotesCollection.findOneAndUpdate({ '_id': new mongodb_1.ObjectID(pedido.idPedido) }, { $set: { estatus: pedido.estatus, idDrone: '38484TTJ39393932D8', fechaModificacion: new Date() } })];
                    case 5:
                        actualizarPedido = _a.sent();
                        // Valida que se haya actualizado el pedido
                        if (actualizarPedido) {
                            res.status(200).send({ status: 'OK', message: "El estatus del pedido se ha actualizado a " + pedido.estatus + " correctamente" });
                        }
                        else {
                            res.status(300).send({ status: 'NOK', message: "No fue posible actualizar el estatus del pedido debido" });
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        res.status(404).send({ status: 'NOK', message: "Este n\u00FAmero de pedido no se encuentra registrado" });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        error_5 = _a.sent();
                        res.status(500).send({ status: 'NOK', message: "No fue posible actualizar el estatus debido a un error inesperado" });
                        logger.error("ACTUALIZAR PEDIDO: No fue posible actualizar el pedido " + pedido.idPedido + " a estatus " + pedido.estatus + " debido a: " + error_5);
                        return [3 /*break*/, 11];
                    case 10:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 23/10/2021
     * @description Devuelve el historial de movimientos del usuario mediante el id usuario
     * @param req
     * @param res
     */
    PedidosService.prototype.getHistorialMovimientosByUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, idUsuario, connection, database, quotesCollection, usuariosService, usuario, historialMovimientos, error_6;
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
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.historialUsuarios);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, 8, 9]);
                        usuariosService = new usuarios_services_1.default();
                        return [4 /*yield*/, usuariosService.getCorreoUsuarioById(idUsuario, database, logger)];
                    case 3:
                        usuario = _a.sent();
                        if (!(usuario !== null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, quotesCollection.find({ idUsuario: idUsuario }).toArray()];
                    case 4:
                        historialMovimientos = _a.sent();
                        // Valida si encuentra historial de movimientos del usuario
                        if (historialMovimientos) {
                            res.status(200).send({ status: 'OK', historialMovimientos: historialMovimientos });
                        }
                        else {
                            res.status(200).send({ status: 'OK', historialMovimientos: [] });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(404).send({ status: 'NOK', message: 'Este usuario no se encuentra registrado' });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        error_6 = _a.sent();
                        res.status(500).send({ status: 'NOK', message: "No fue posible devolver el historial de movimientos del usuario debido a un error desconocido" });
                        logger.error("GET HISTORIAL MOVIMIENTOS BY USUARIO: No fue posible devolver el historial de movimientos del usuario " + idUsuario + " debido a: " + error_6);
                        return [3 /*break*/, 9];
                    case 8:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 28/10/2021
     * @description Devuelve el listado de comentarios de los usuarios
     * @param req
     * @param res
     */
    PedidosService.prototype.getComentarios = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, connection, database, quotesCollection, comentarios, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.comentariosPedidos);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, quotesCollection.find({}).toArray()];
                    case 3:
                        comentarios = _a.sent();
                        // Valida si encuentra los comentarios
                        if (comentarios) {
                            res.status(200).send({ status: 'OK', comentarios: comentarios });
                        }
                        else {
                            res.status(200).send({ status: 'OK', comentarios: [] });
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_7 = _a.sent();
                        res.status(500).send({ status: 'NOK', message: "No fue posible devolver el listado de comentarios de los pedidos" });
                        logger.error("GET COMENTARIOS: No fue poisible devolver el listado de comentarios debido a: " + error_7);
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
     * @date 24/10/2021
     * @description Crea el comentario del usuario en base a la experiencia del pedido
     * @param req
     * @param res
     */
    PedidosService.prototype.crearComentarioPedido = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, comentariosPedido, connection, database, quotesCollection, datosPedido, usuariosService, usuario, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        comentariosPedido = req.body;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_2.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.comentariosPedidos);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, 9, 10]);
                        return [4 /*yield*/, this.validarExistenciaPedido(comentariosPedido.idPedido, logger, database)];
                    case 3:
                        datosPedido = _a.sent();
                        usuariosService = new usuarios_services_1.default();
                        return [4 /*yield*/, usuariosService.getCorreoUsuarioById(comentariosPedido.usuario.idUsuario, database, logger)];
                    case 4:
                        usuario = _a.sent();
                        // Valida que el usuario exista
                        if (usuario === null) {
                            return [2 /*return*/, res.status(404).send({ status: 'NOK', message: "Este usuario no se encuentra registrado" })];
                        }
                        if (!(datosPedido !== null)) return [3 /*break*/, 6];
                        // Registra el comentario asociado al pedido
                        return [4 /*yield*/, quotesCollection.insertOne({ comentariosPedido: comentariosPedido })];
                    case 5:
                        // Registra el comentario asociado al pedido
                        _a.sent();
                        res.status(200).send({ status: 'OK', message: "Muchas gracias por tus comentarios, tu opini\u00F3n es muy importante para nosotros" });
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(404).send({ status: 'NOK', message: "Este n\u00FAmero de pedido no esta registrado" });
                        _a.label = 7;
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        error_8 = _a.sent();
                        res.status(500).send({ status: 'NOK', message: "No fue posible crear su comentario debido a que ocurri\u00F3 un error inesperado" });
                        logger.error("CREAR COMENTARIO PEDIDO: No fue posible crear el comentario del usuario " + comentariosPedido.usuario.idUsuario + " debido a: " + error_8);
                        return [3 /*break*/, 10];
                    case 9:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return PedidosService;
}());
exports.default = PedidosService;
