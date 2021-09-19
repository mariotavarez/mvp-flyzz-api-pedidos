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
// Databases
var enviroment_1 = require("./../global/enviroment");
// Token
var token_1 = __importDefault(require("../middlewares/token"));
var AutenticacionService = /** @class */ (function () {
    function AutenticacionService() {
    }
    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Autentica al usuario por medio de el correo y el password
     * @param req
     * @param res
     */
    AutenticacionService.prototype.autenticarUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, database, autenticacion, quotesCollection, usuario, token, tokenGenerate, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = new connection_1.default();
                        // Espera a que conecte la BD
                        return [4 /*yield*/, connection.connectToDB()];
                    case 1:
                        // Espera a que conecte la BD
                        _a.sent();
                        database = connection.client.db(enviroment_1.DATABASE.dbName);
                        autenticacion = req.body;
                        quotesCollection = database.collection(enviroment_1.COLLECTIONS.usuarios);
                        return [4 /*yield*/, quotesCollection.findOne({ correo: autenticacion.correo })];
                    case 2:
                        usuario = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 9, 10, 11]);
                        if (!usuario) return [3 /*break*/, 7];
                        if (!(usuario.password === autenticacion.password)) return [3 /*break*/, 5];
                        token = new token_1.default();
                        return [4 /*yield*/, token.generateToken(autenticacion)];
                    case 4:
                        tokenGenerate = _a.sent();
                        // Enviar token de usuario
                        res.status(200).send({ status: 'OK', message: 'Credenciales correctas', token: tokenGenerate });
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(300).send({ status: 'NOK', message: 'Las credenciales son incorrectas' });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        res.status(404).send({ status: 'NOK', message: "El correo " + autenticacion.correo + " no se encuentra registrado" });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        error_1 = _a.sent();
                        res.status(404).send({ status: 'NOK', message: "No fue posible autenticar su cuenta debido a " + error_1 });
                        return [3 /*break*/, 11];
                    case 10:
                        connection.client.close();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return AutenticacionService;
}());
exports.default = AutenticacionService;
