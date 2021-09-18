"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.post('/', function (req, res) {
    var _a = req.body, correo = _a.correo, password = _a.password;
    res.json({ ok: true, mensaje: 'Todo esta bien' });
});
exports.default = router;
