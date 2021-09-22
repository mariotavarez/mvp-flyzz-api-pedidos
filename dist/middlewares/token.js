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
// Json Web Token
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Constants
var constants_1 = require("../global/constants");
// Log Server
var logServer_1 = __importDefault(require("../classes/logServer"));
var Token = /** @class */ (function () {
    function Token() {
    }
    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Genera el nuevo token del usuario de 24 horas
     * @param autenticacion
     * @returns
     */
    Token.prototype.generateToken = function (autenticacion) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, jsonwebtoken_1.default.sign({
                            payload: {
                                correo: autenticacion.correo,
                                createAt: new Date(),
                                subject: constants_1.ASUNTO_TOKEN
                            }
                        }, enviroment_1.TOKEN, { expiresIn: '30d' })];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Valida el token del usuario
     * @param token
     * @returns
     */
    Token.prototype.validateToken = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, logServer, logger, responseToken, error_1, logServer, logger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.header("x-auth-token");
                        // Si no eiste el token entonces enviar codigo de token necesario
                        if (!token) {
                            logServer = new logServer_1.default();
                            logger = logServer.getLogConfigMVP();
                            logger.warn("TOKEN VAC\u00CDO: Request " + req.originalUrl + " Payload: " + JSON.stringify(req.body) + ", IP: " + req.ip + ", PATH: " + req.path + ", URL: " + req.url);
                            return [2 /*return*/, res.status(403).send({ status: 'NOK', message: 'Es necesario el token de autenticación' })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(token, enviroment_1.TOKEN)];
                    case 2:
                        responseToken = _a.sent();
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        logger.warn("TOKEN INV\u00C1LIDO: Request " + req.originalUrl + " Payload: " + JSON.stringify(req.body) + ", IP: " + req.ip + ", PATH: " + req.path + ", URL: " + req.url + ", por error " + error_1);
                        return [2 /*return*/, res.status(404).send({ status: 'NOK', message: 'El token es inválido' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Token;
}());
exports.default = Token;
