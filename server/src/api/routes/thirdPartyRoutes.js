"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thirdPartyController_1 = require("../controllers/thirdPartyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/trails', authMiddleware_1.authMiddleware, thirdPartyController_1.getTrails);
router.get('/weather', authMiddleware_1.authMiddleware, thirdPartyController_1.getWeather);
exports.default = router;
