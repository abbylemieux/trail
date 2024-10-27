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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};
const register = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, name }) {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_1.default.create({ email, password: hashedPassword, name });
    if (user) {
        console.log('User registered successfully');
        return generateToken(user.id);
    }
    else {
        throw new Error('Failed to register user');
    }
});
exports.register = register;
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield user_1.default.findOne({ where: { email } });
    if (!user || !(yield user.comparePassword(password))) {
        throw new Error('Invalid login');
    }
    return generateToken(user.id);
});
exports.login = login;
