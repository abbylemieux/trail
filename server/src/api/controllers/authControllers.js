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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
exports.registerUserHandler = registerUserHandler;
const authServices_1 = require("../services/authServices");
const registrationService_1 = require("../services/registrationService");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const token = yield (0, authServices_1.register)({ email, password, name });
        res.status(201).json({ token });
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(400).json({ message: 'Error registering user', error: errorMessage });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield (0, authServices_1.login)({ email, password });
        res.status(200).json({ token });
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(401).json({ message: 'Error logging in', error: errorMessage });
    }
});
exports.loginUser = loginUser;
function registerUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, objectId } = req.body;
        try {
            const registrationData = Object.assign({ email,
                password }, (objectId && { objectId }));
            const result = yield (0, registrationService_1.registrationService)(registrationData);
            res.status(201).json(result);
        }
        catch (error) {
            const errorMessage = error.message || 'Internal Server Error';
            res.status(500).json({ message: errorMessage });
        }
    });
}
