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
var constants_1 = require("./../global/constants");
// Connection Database
var connection_1 = __importDefault(require("../classes/connection"));
// Database
var enviroment_1 = require("../global/enviroment");
var mail_1 = __importDefault(require("../utils/mail"));
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
            var altaUsuario, connection, database, quotesCollection, idRepeated, mail, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        altaUsuario = req.body;
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_1.DATABASE.dbName);
                        quotesCollection = database.collection('usuarios');
                        return [4 /*yield*/, this.validarExistenciaCorreo(altaUsuario.correo, quotesCollection)];
                    case 2:
                        idRepeated = _a.sent();
                        if (!!idRepeated) return [3 /*break*/, 9];
                        // Realiza la insercion en la coleccion de usuarios
                        return [4 /*yield*/, quotesCollection.insertOne(altaUsuario)];
                    case 3:
                        // Realiza la insercion en la coleccion de usuarios
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, 7, 8]);
                        mail = new mail_1.default();
                        // Envia el email al usuario registrado
                        return [4 /*yield*/, mail.sendMail(altaUsuario.correo, constants_1.PLANTILLAS_CORREO.registro).then(function (email) {
                                res.status(200).send({ status: 'OK', message: 'Usuario dado de alta correctamente' });
                            }).catch(function (error) {
                                console.log(error.message);
                                res.status(200).send({ status: 'NOK', message: "Usuario dada de alta correctamente, sin enbargo no fue posible enviar el correo de registro a la direcci\u00F3n de correo " + altaUsuario.correo });
                            })];
                    case 5:
                        // Envia el email al usuario registrado
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _a.sent();
                        res.status(404).send({ status: 'NOK', message: 'No fue posible registrar sus datos' });
                        return [3 /*break*/, 8];
                    case 7:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        res.status(200).send({ status: 'NOK', message: "El correo " + altaUsuario.correo + " ya se ha dado de alta anteriormente, intente con uno diferente" });
                        _a.label = 10;
                    case 10: return [2 /*return*/];
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
    return UsuariosService;
}());
exports.default = UsuariosService;
