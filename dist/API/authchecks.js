"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Protected routes can be added here using tokenChecker middleware
// Example: router.get('/protected', tokenChecker('Student'), handler)
exports.default = router;
