"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router.post('/register', authControllers_1.registerUser);
router.post('/login', authControllers_1.loginUser);
exports.default = router;
