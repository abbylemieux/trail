"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/profile', authMiddleware_1.authMiddleware, userController_1.getUserProfile);
router.put('/profile', authMiddleware_1.authMiddleware, userController_1.updateUserProfile);
exports.default = router;
