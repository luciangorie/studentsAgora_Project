"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenChecker = tokenChecker;
exports.TokenGen = TokenGen;
exports.TokenGenEnt = TokenGenEnt;
exports.TokenGenVend = TokenGenVend;
exports.TokenGenAdmin = TokenGenAdmin;
exports.st = st;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function tokenChecker(accessType) {
    return function (req, res, next) {
        const token = req.headers['x-access-token'] ||
            req.query.token ||
            req.body.token;
        if (!token) {
            res.status(401).json({ success: false, message: 'No token provided.' });
            return;
        }
        const secret = process.env.SUPER_SECRET || 'niente';
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
                return;
            }
            const payload = decoded;
            if (!payload || payload.aut !== accessType) {
                if ((payload.aut === 'Venditore' && (accessType === 'Imprenditore' || accessType === 'Cliente')) ||
                    (payload.aut === 'Imprenditore' && accessType === 'Cliente')) {
                    next();
                    return;
                }
                res.status(403).json({ success: false, message: 'Unauthorized: invalid account type.' });
                return;
            }
            next();
        });
    };
}
function TokenGen(email) {
    const payload = { email, aut: 'Student' };
    const secret = process.env.SUPER_SECRET || 'niente';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
}
function TokenGenEnt(email) {
    const payload = { email, aut: 'Imprenditore' };
    const secret = process.env.SUPER_SECRET || 'niente';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
}
function TokenGenVend(email) {
    const payload = { email, aut: 'Venditore' };
    const secret = process.env.SUPER_SECRET || 'niente';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
}
function TokenGenAdmin(email) {
    const payload = { email, aut: 'Admin' };
    const secret = process.env.SUPER_SECRET || 'niente';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
}
function st(token) {
    const decoded = jsonwebtoken_1.default.decode(token);
    console.log('Decoded Token:', decoded);
}
