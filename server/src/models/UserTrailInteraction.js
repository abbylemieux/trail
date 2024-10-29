"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserTrailInteraction extends sequelize_1.Model {
}
UserTrailInteraction.init({
    interaction_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    api_trail_id: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    interaction_type: {
        type: sequelize_1.DataTypes.ENUM('view', 'completed', 'saved'),
        allowNull: false,
    },
    interaction_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    is_deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'UserTrailInteraction',
    tableName: 'user_trail_interactions',
    timestamps: false,
});
exports.default = UserTrailInteraction;
