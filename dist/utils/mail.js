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
// Constants
var constants_1 = require("./../global/constants");
// NodeMailer
var nodemailer_1 = __importDefault(require("nodemailer"));
// Email Config
var enviroment_1 = require("../global/enviroment");
// Log Server
var logServer_1 = __importDefault(require("../classes/logServer"));
var Mail = /** @class */ (function () {
    function Mail() {
    }
    /**
     * @author Mario Tavarez
     * @date 19/07/2021
     * @description Envia el email al destinatario y dependiendo de la plantilla envia el correo correspondiente
     * @param correoDestinatario
     * @param plantilla
     */
    Mail.prototype.sendMail = function (correoDestinatario, plantilla) {
        return __awaiter(this, void 0, void 0, function () {
            var logServer, logger, transporter, plantillaHTML, asuntoCorreo, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logServer = new logServer_1.default();
                        logger = logServer.getLogConfigMVP();
                        transporter = nodemailer_1.default.createTransport({
                            service: enviroment_1.EMAIL_CONFIG.service,
                            secure: enviroment_1.EMAIL_CONFIG.secure,
                            auth: {
                                user: enviroment_1.EMAIL_CONFIG.auth.user,
                                pass: enviroment_1.EMAIL_CONFIG.auth.pass // naturally, replace both with your real credentials or an application-specific password
                            }
                        });
                        plantillaHTML = null;
                        asuntoCorreo = '';
                        // Valida que tipo de plantilla se ha seleccionado
                        if (plantilla === constants_1.PLANTILLAS_CORREO.registro) {
                            plantillaHTML = this.getPlantillaRegistro();
                            asuntoCorreo = constants_1.ASUNTOS_CORREO.registro;
                        }
                        mailOptions = {
                            from: enviroment_1.EMAIL_CONFIG.auth.user,
                            to: correoDestinatario,
                            subject: asuntoCorreo,
                            html: plantillaHTML
                        };
                        // Envio de correo
                        return [4 /*yield*/, transporter.sendMail(mailOptions, function (error, info) {
                                // Valida si existe un error
                                if (error) {
                                    logger.error("ENVIO ASUNTO DE CORREO " + asuntoCorreo + ": No fue posible enviar el correo al destinatario " + correoDestinatario + " debido a: " + error.message);
                                }
                                else {
                                    logger.info("ENVIO ASUNTO DE CORREO " + asuntoCorreo + ": Correo enviado correctamente al destinatario " + correoDestinatario);
                                }
                            })];
                    case 1:
                        // Envio de correo
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @author Mario Tavarez
     * @date 18/07/2021
     * @description Devuelve la plantilla de registro de usuarios
     * @returns
     */
    Mail.prototype.getPlantillaRegistro = function () {
        var plantilla = "\n        <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n        <html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n        <head>\n        <meta charset=\"UTF-8\">\n        <meta content=\"width=device-width, initial-scale=1\" name=\"viewport\">\n        <meta name=\"x-apple-disable-message-reformatting\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n        <meta content=\"telephone=no\" name=\"format-detection\">\n        <title></title>\n        <!--[if (mso 16)]>\n        <style type=\"text/css\">\n        a {text-decoration: none;}\n        </style>\n        <![endif]-->\n        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->\n        <!--[if gte mso 9]>\n    <xml>\n        <o:OfficeDocumentSettings>\n        <o:AllowPNG></o:AllowPNG>\n        <o:PixelsPerInch>96</o:PixelsPerInch>\n        </o:OfficeDocumentSettings>\n    </xml>\n    <![endif]-->\n    </head>\n    \n    <body>\n        <div class=\"es-wrapper-color\">\n            <!--[if gte mso 9]>\n                <v:background xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"t\">\n                    <v:fill type=\"tile\" color=\"#fafafa\"></v:fill>\n                </v:background>\n            <![endif]-->\n            <table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n                <tbody>\n                    <tr>\n                        <td class=\"esd-email-paddings\" valign=\"top\">\n                            <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content esd-header-popover\" align=\"center\">\n                                <tbody>\n                                    <tr>\n                                        <td class=\"esd-stripe esd-synchronizable-module\" align=\"center\">\n                                            <table class=\"es-content-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"background-color: transparent;\" bgcolor=\"rgba(0, 0, 0, 0)\">\n                                                <tbody>\n                                                    <tr>\n                                                        <td class=\"esd-structure\" align=\"left\">\n                                                            <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                                <tbody>\n                                                                    <tr>\n                                                                        <td width=\"600\" class=\"esd-container-frame\" align=\"center\" valign=\"top\">\n                                                                            <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                                                <tbody>\n                                                                                    <tr>\n                                                                                        <td align=\"center\" class=\"esd-block-image es-p10t es-p10b\" style=\"font-size: 0px;\"><a target=\"_blank\"><img src=\"https://rsvrsw.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png\" alt style=\"display: block;\" width=\"100\"></a></td>\n                                                                                    </tr>\n                                                                                    <tr>\n                                                                                        <td align=\"center\" class=\"esd-block-text es-p10b\">\n                                                                                            <h1>\u00A1REGISTRO EXITOSO!<br></h1>\n                                                                                        </td>\n                                                                                    </tr>\n                                                                                    <tr>\n                                                                                        <td align=\"center\" class=\"esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l\">\n                                                                                            <p>Nos da mucho gusto que te hayas registrado, estas a un paso mas cerca de vivir la mejor experiencia de delivery</p>\n                                                                                        </td>\n                                                                                    </tr>\n                                                                                </tbody>\n                                                                            </table>\n                                                                        </td>\n                                                                    </tr>\n                                                                </tbody>\n                                                            </table>\n                                                        </td>\n                                                    </tr>\n                                                </tbody>\n                                            </table>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                            <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-footer esd-footer-popover\" align=\"center\">\n                                <tbody>\n                                    <tr>\n                                        <td class=\"esd-stripe esd-synchronizable-module\" align=\"center\">\n                                            <table class=\"es-footer-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"640\" style=\"background-color: transparent;\">\n                                                <tbody>\n                                                    <tr>\n                                                        <td class=\"esd-structure es-p20t es-p20b es-p20r es-p20l\" align=\"left\">\n                                                            <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                                <tbody>\n                                                                    <tr>\n                                                                        <td width=\"600\" class=\"esd-container-frame\" align=\"left\">\n                                                                            <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                                                <tbody>\n                                                                                    <tr>\n                                                                                        <td align=\"center\" class=\"esd-block-image\" style=\"font-size: 0px;\"><a target=\"_blank\"><img src=\"https://rsvrsw.stripocdn.email/content/guids/CABINET_7e950ca938d80aa0b5ba345d34cb99a4/images/33421631986594429.png\" alt=\"Logo\" style=\"display: block; font-size: 12px;\" width=\"125\" title=\"Logo\"></a></td>\n                                                                                    </tr>\n                                                                                    <tr>\n                                                                                        <td align=\"center\" class=\"esd-block-social es-p15t es-p15b\" style=\"font-size:0\">\n                                                                                            <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-table-not-adapt es-social\">\n                                                                                                <tbody>\n                                                                                                    <tr>\n                                                                                                        <td align=\"center\" valign=\"top\" class=\"es-p40r\"><a target=\"_blank\" href=\"https://www.facebook.com/flyzzdronedelivery\"><img title=\"Facebook\" src=\"https://rsvrsw.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png\" alt=\"Fb\" width=\"32\"></a></td>\n                                                                                                        <td align=\"center\" valign=\"top\"><a target=\"_blank\" href=\"https://www.youtube.com/channel/UCdbcroNHdv11H0q4prMk4TQ\"><img title=\"Youtube\" src=\"https://rsvrsw.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png\" alt=\"Yt\" width=\"32\"></a></td>\n                                                                                                    </tr>\n                                                                                                </tbody>\n                                                                                            </table>\n                                                                                        </td>\n                                                                                    </tr>\n                                                                                    <tr>\n                                                                                        <td align=\"center\" class=\"esd-block-text es-p35b\">\n                                                                                            <p>Ecnology S.A.P.I. DE C.V.&nbsp;\u00A9 2021 Todos los derechos reservados.</p>\n                                                                                            <p>Nuqleo, Qro.<br>Tel: (442) 362 55 49<br>https://www.flyzz.info/</p>\n                                                                                        </td>\n                                                                                    </tr>\n                                                                                </tbody>\n                                                                            </table>\n                                                                        </td>\n                                                                    </tr>\n                                                                </tbody>\n                                                            </table>\n                                                        </td>\n                                                    </tr>\n                                                </tbody>\n                                            </table>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </body>\n    \n    </html>\n        ";
        return plantilla;
    };
    return Mail;
}());
exports.default = Mail;
