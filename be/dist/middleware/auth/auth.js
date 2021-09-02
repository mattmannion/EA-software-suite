"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function auth_check(req, res, next) {
    try {
        if (!req.session || !req.session.username)
            res.status(401).json({
                status: 'not authorized',
            });
        else
            next();
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = auth_check;
