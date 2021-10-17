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
var enviroment_1 = require("./../../global/enviroment");
// Connection Database
var connection_1 = __importDefault(require("../../classes/connection"));
// Database Control
var enviroment_2 = require("../../global/enviroment");
// Security
var security_1 = __importDefault(require("../../classes/security"));
// Log Server
var logServer_1 = __importDefault(require("../../classes/logServer"));
// Middleware
var token_1 = __importDefault(require("../../middlewares/token"));
var AutenticacionControlService = /** @class */ (function () {
    function AutenticacionControlService() {
    }
    /**
     * @author Mario Tavarez
     * @date 16/10/2021
     * @description Autentica al usuario por medio de el correo y el password
     * @param req
     * @param res
     */
    AutenticacionControlService.prototype.autenticarUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, connection, database, autenticacion, quotesCollection, usuario, security, passwordCorrect, token, tokenGenerate, informacionUsuario, error_1;
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
                        database = connection.client.db(enviroment_2.DATABASE_CONTROL.dbName);
                        autenticacion = req.body;
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS_CONTROL.usuarios);
                        return [4 /*yield*/, quotesCollection.findOne({ correo: autenticacion.correo })];
                    case 2:
                        usuario = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 10, 11, 12]);
                        if (!usuario) return [3 /*break*/, 8];
                        security = new security_1.default();
                        return [4 /*yield*/, security.decryptHash(autenticacion.password, usuario.password)];
                    case 4:
                        passwordCorrect = _a.sent();
                        if (!passwordCorrect) return [3 /*break*/, 6];
                        token = new token_1.default();
                        return [4 /*yield*/, token.generateToken(autenticacion)];
                    case 5:
                        tokenGenerate = _a.sent();
                        informacionUsuario = {
                            idUsuario: usuario._id.toString(),
                            nombre: usuario.nombre,
                            correo: usuario.correo,
                            apellidoPaterno: usuario.apellidoPaterno,
                            apellidoMaterno: usuario.apellidoMaterno,
                            imagen: usuario.imagen,
                            fechaCreacion: usuario.fechaCreacion
                        };
                        // Enviar token de usuario
                        res.status(200).send({ status: 'OK', message: 'Credenciales correctas', token: tokenGenerate, informacionUsuario: informacionUsuario });
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(300).send({ status: 'NOK', message: 'Las credenciales son incorrectas' });
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        res.status(404).send({ status: 'NOK', message: "El correo " + autenticacion.correo + " no se encuentra registrado" });
                        _a.label = 9;
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        error_1 = _a.sent();
                        logger.error("No fue posible autenticar la cuenta " + autenticacion.correo + " debido a: " + error_1);
                        res.status(404).send({ status: 'NOK', message: "No fue posible autenticar su cuenta debido a " + error_1 });
                        return [3 /*break*/, 12];
                    case 11:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return AutenticacionControlService;
}());
exports.default = AutenticacionControlService;
