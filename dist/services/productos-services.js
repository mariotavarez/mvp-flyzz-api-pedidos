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
// Connection
var connection_1 = __importDefault(require("../classes/connection"));
// Enviroment
var enviroment_1 = require("../global/enviroment");
// Log Server
var logServer_1 = __importDefault(require("../classes/logServer"));
var ProductosService = /** @class */ (function () {
    function ProductosService() {
    }
    /**
     * @author Mario Tavarez
     * @description Devuelve el listado de productos
     * @date 18/09/2021
     * @param res
     */
    ProductosService.prototype.getProductos = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, connection, database, quotesCollection, productos;
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
                        database = connection.client.db(enviroment_1.DATABASE.dbName);
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.productos);
                        return [4 /*yield*/, quotesCollection.find({}).toArray()];
                    case 2:
                        productos = _a.sent();
                        try {
                            // Valida si existen productos registrados
                            if (productos) {
                                res.status(200).send({ status: 'OK', productos: productos });
                            }
                            else {
                                res.status(404).send({ status: 'NOK', message: 'No fue posible devolver los productos' });
                            }
                        }
                        catch (error) {
                            logger.error("DEVOLUCION DE PRODUCTOS: No fue posible devolver los productos debido a " + error);
                            res.status(404).send({ status: 'NOK', message: "No fue posible devolver los productos debido a " + error });
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
     * @date 18/07/2021
     * @description Devuelve los productos por categoria
     * @param req
     * @param res
     */
    ProductosService.prototype.getProductosByCategoria = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, connection, database, idCategoria, quotesCollection, productos;
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
                        database = connection.client.db(enviroment_1.DATABASE.dbName);
                        idCategoria = req.params.idCategoria;
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.productos);
                        return [4 /*yield*/, quotesCollection.find({ idCategoria: idCategoria }).toArray()];
                    case 2:
                        productos = _a.sent();
                        try {
                            // Valida si existen productos registrados
                            if (productos) {
                                // Valida si devuelve productos
                                if (productos.length > 0) {
                                    res.status(200).send({ status: 'OK', productos: productos });
                                }
                                else {
                                    res.status(404).send({ status: 'OK', message: 'No existen productos asociados a esta categoría' });
                                }
                            }
                            else {
                                res.status(404).send({ status: 'NOK', message: 'No fue posible devolver los productos' });
                            }
                        }
                        catch (error) {
                            logger.error("DEVOLUCION DE PRODUCTOS POR CATEGORIA: No fue posible devolver los productos debido a " + error);
                            res.status(404).send({ status: 'NOK', message: "No fue posible devolver los productos debido a " + error });
                        }
                        finally {
                            connection.client.close();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductosService;
}());
exports.default = ProductosService;
