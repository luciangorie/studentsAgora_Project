"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.compareDBAdmin = compareDBAdmin;
exports.compareDBStudent = compareDBStudent;
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminModel_1 = __importDefault(require("./models/adminModel"));
const studentModel_1 = __importDefault(require("./models/studentModel"));
async function hashPassword(password) {
    return bcrypt_1.default.hash(password, 5);
}
async function comparePassword(inputPassword, hashedPassword) {
    return bcrypt_1.default.compare(inputPassword, hashedPassword);
}
async function compareDBAdmin(usermail, password) {
    const user = await adminModel_1.default.findOne({ email: usermail });
    if (!user)
        return false;
    return comparePassword(password, user.password);
}
async function compareDBStudent(usermail, password) {
    const user = await studentModel_1.default.findOne({ email: usermail });
    if (!user)
        return false;
    return comparePassword(password, user.password);
}
