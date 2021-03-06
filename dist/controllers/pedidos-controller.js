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
// Services
var pedidos_services_1 = __importDefault(require("../services/pedidos-services"));
var PedidosController = /** @class */ (function () {
    function PedidosController() {
    }
    /**
     * @author Mario Tavarez
     * @date 19/10/2021
     * @description Devuelve el listado de pedidos
     * @param res
     * @returns
     */
    PedidosController.prototype.getPedidos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseGetPedidos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.getPedidos(res)];
                    case 1:
                        responseGetPedidos = _a.sent();
                        // Devuelve la respuesta de devolucion de pedidos
                        return [2 /*return*/, responseGetPedidos];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 18/09/2021
     * @description Crea el pedido del usuario y registra un movimiento en la colecci??n de historial de usuarios
     * @param req
     * @param res
     * @returns
     */
    PedidosController.prototype.crearPedido = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseCrearPedido;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.crearPedido(req, res)];
                    case 1:
                        responseCrearPedido = _a.sent();
                        // Devuelve la respuesta de crear pedido
                        return [2 /*return*/, responseCrearPedido];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 24/09/2021
     * @description Actualiza el estatus del pedido mediante el id pedido y el estatus que se actualiza
     * @param req
     * @param res
     * @returns
     */
    PedidosController.prototype.actualizarPedido = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseActualizarPedido;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.actualizarEstatusPedidoById(req, res)];
                    case 1:
                        responseActualizarPedido = _a.sent();
                        // Devuelve la respuesta de crear pedido
                        return [2 /*return*/, responseActualizarPedido];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 23/10/2021
     * @description Devuelve el estatus del pedido mediante el id
     * @param req
     * @param res
     * @returns
     */
    PedidosController.prototype.getEstatusPedidoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseGetEstatusById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.getEstatusPedidoById(req, res)];
                    case 1:
                        responseGetEstatusById = _a.sent();
                        // Devuelve la respuesta del estatus del pedido mediante el id
                        return [2 /*return*/, responseGetEstatusById];
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
    PedidosController.prototype.getHistorialMovimientosByUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseHistorialMovimientosByUsuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.getHistorialMovimientosByUsuario(req, res)];
                    case 1:
                        responseHistorialMovimientosByUsuario = _a.sent();
                        // Devuelve la respuesta del historial de movimientos por usuario
                        return [2 /*return*/, responseHistorialMovimientosByUsuario];
                }
            });
        });
    };
    /**
    * @author Mario Tavarez
    * @date 28/10/2021
    * @description Devuelve el listado de comentarios asociados a los pedidos
    * @param req
    * @param res
    */
    PedidosController.prototype.getComentarios = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseComentarios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.getComentarios(req, res)];
                    case 1:
                        responseComentarios = _a.sent();
                        // Obtiene la respuesta de devolucion de comentarios
                        return [2 /*return*/, responseComentarios];
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
    PedidosController.prototype.crearComentarioPedido = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseCrearComentarioPedido;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.crearComentarioPedido(req, res)];
                    case 1:
                        responseCrearComentarioPedido = _a.sent();
                        // Devuelve la respuesta de crear el comentario del pedido
                        return [2 /*return*/, responseCrearComentarioPedido];
                }
            });
        });
    };
    /**
      * @author Mario Tavarez
      * @date 08/11/2021
      * @description Devuelve las configuraciones del sistema
      * @param req
      * @param res
      */
    PedidosController.prototype.getConfiguraciones = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidosService, responseConfiguraciones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidosService = new pedidos_services_1.default();
                        return [4 /*yield*/, pedidosService.getConfiguraciones(req, res)];
                    case 1:
                        responseConfiguraciones = _a.sent();
                        // Devuelve la respuesta para devolver las configuraciones del sistema
                        return [2 /*return*/, responseConfiguraciones];
                }
            });
        });
    };
    return PedidosController;
}());
exports.default = PedidosController;
