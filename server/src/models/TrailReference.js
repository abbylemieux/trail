"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TrailReference extends sequelize_1.Model {
}
TrailReference.init({
    trail_ref_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    api_trail_id: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    last_known_name: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    popularity_score: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    is_deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'TrailReference',
    tableName: 'trail_references',
    timestamps: false,
});
exports.default = TrailReference;
