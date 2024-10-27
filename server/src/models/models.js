"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Trail = database_1.default.define('Trail', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Trail;
