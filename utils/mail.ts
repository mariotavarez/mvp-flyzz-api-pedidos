// Constants
import { ASUNTOS_CORREO, PLANTILLAS_CORREO } from './../global/constants';
// NodeMailer
import nodemailer from 'nodemailer';
// Email Config
import { EMAIL_CONFIG } from '../global/enviroment';
// Log Server
import LogServer from '../classes/logServer';
// Log4js
import { Logger } from 'log4js';

export default class Mail {

    constructor() { }

    /**
     * @author Mario Tavarez
     * @date 19/07/2021
     * @description Envia el email al destinatario y dependiendo de la plantilla envia el correo correspondiente
     * @param correoDestinatario 
     * @param plantilla 
     */
    public async sendMail(correoDestinatario: string, plantilla: string): Promise<any> {
        // Crea la instancia de Servidor de Log
        const logServer = new LogServer();
        // Obtiene la configuracion del log MVP
        const logger: Logger = logServer.getLogConfigMVP();
        // Crea la configuracion de las credenciales
        const transporter = nodemailer.createTransport({
            service: EMAIL_CONFIG.service,
            secure: EMAIL_CONFIG.secure,
            auth: {
                user: EMAIL_CONFIG.auth.user,
                pass: EMAIL_CONFIG.auth.pass // naturally, replace both with your real credentials or an application-specific password
            }
        });
        // Plantilla
        let plantillaHTML: any = null;
        // Asunto Correo
        let asuntoCorreo: string = '';
        // Valida que tipo de plantilla se ha seleccionado
        if (plantilla === PLANTILLAS_CORREO.registro) {
            plantillaHTML = this.getPlantillaRegistro();
            asuntoCorreo = ASUNTOS_CORREO.registro
        }
        // Configuracion de email
        const mailOptions = {
            from: EMAIL_CONFIG.auth.user,
            to: correoDestinatario,
            subject: asuntoCorreo,
            html: plantillaHTML
        };
        // Envio de correo
        await transporter.sendMail(mailOptions, function (error, info) {
            // Valida si existe un error
            if (error) {
                logger.error(`ENVIO ASUNTO DE CORREO ${asuntoCorreo}: No fue posible enviar el correo al destinatario ${correoDestinatario} debido a: ${error.message}`);
            } else {
                logger.info(`ENVIO ASUNTO DE CORREO ${asuntoCorreo}: Correo enviado correctamente al destinatario ${correoDestinatario}`);
            }
        });


    }

    /**
     * @author Mario Tavarez
     * @date 18/07/2021
     * @description Devuelve la plantilla de registro de usuarios
     * @returns 
     */
    public getPlantillaRegistro(): any {

        let plantilla = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title></title>
        <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    
    <body>
        <div class="es-wrapper-color">
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#fafafa"></v:fill>
                </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe esd-synchronizable-module" align="center">
                                            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;"><a target="_blank"><img src="https://rsvrsw.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt style="display: block;" width="100"></a></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p10b">
                                                                                            <h1>¡REGISTRO EXITOSO!<br></h1>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                            <p>Nos da mucho gusto que te hayas registrado, estas a un paso mas cerca de vivir la mejor experiencia de delivery</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe esd-synchronizable-module" align="center">
                                            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="640" style="background-color: transparent;">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="600" class="esd-container-frame" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://rsvrsw.stripocdn.email/content/guids/CABINET_7e950ca938d80aa0b5ba345d34cb99a4/images/33421631986594429.png" alt="Logo" style="display: block; font-size: 12px;" width="125" title="Logo"></a></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" valign="top" class="es-p40r"><a target="_blank" href="https://www.facebook.com/flyzzdronedelivery"><img title="Facebook" src="https://rsvrsw.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32"></a></td>
                                                                                                        <td align="center" valign="top"><a target="_blank" href="https://www.youtube.com/channel/UCdbcroNHdv11H0q4prMk4TQ"><img title="Youtube" src="https://rsvrsw.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32"></a></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p35b">
                                                                                            <p>Ecnology S.A.P.I. DE C.V.&nbsp;© 2021 Todos los derechos reservados.</p>
                                                                                            <p>Nuqleo, Qro.<br>Tel: (442) 362 55 49<br>https://www.flyzz.info/</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    
    </html>
        `;
        return plantilla;
    }
}
