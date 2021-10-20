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
// Log Server
var logServer_1 = __importDefault(require("../classes/logServer"));
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
                        if (pedidos) {
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
            var logServer, logger, crearPedido, connection, database, quotesCollection, idPedido, movimientoHistorialRegistered, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        crearPedido = req.body;
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
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, quotesCollection.insertOne(crearPedido)];
                    case 3: return [4 /*yield*/, (_a.sent()).insertedId];
                    case 4:
                        idPedido = _a.sent();
                        return [4 /*yield*/, this.crearMovimientoHistorial(crearPedido, idPedido.toString(), database)];
                    case 5:
                        movimientoHistorialRegistered = _a.sent();
                        // Si se creó el pedido y el movimiento en el historial del usuario entonces todo se registró correctamente
                        if (idPedido && movimientoHistorialRegistered) {
                            res.status(200).send({ status: 'OK', message: "Su pedido ha sido recibido, en breve usted disfrutar\u00E1 de la mejor experiencia de delivery cortes\u00EDa de FLYZZ" });
                        }
                        if (idPedido && !movimientoHistorialRegistered) {
                            res.status(200).send({ status: 'OK', message: "Su pedido ha sido recibido, en breve usted disfrutar\u00E1 de la mejor experiencia de delivery cortes\u00EDa de FLYZZ" });
                            logger.error("CREAR PEDIDO: Pedido creado correctamente para el usuario " + crearPedido.idUsuario + ", sin embargo, no fue posible registrar el movimiento en la colecci\u00F3n de historial de usuarios");
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        logger.error("CREAR PEDIDO: No fue posible crear el pedido del usuario " + crearPedido.idUsuario + " debido a: " + error_2);
                        res.status(500).send({ status: 'NOK', message: "No fue posible crear su pedido, por favor vuelva a intentarlo en unos minutos" });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
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
    return PedidosService;
}());
exports.default = PedidosService;
