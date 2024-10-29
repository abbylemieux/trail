import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class HikingHistory extends Model {
    public history_id!: number;
    public user_id!: number;
    public api_trail_id!: string;
    public start_time!: Date;
    public end_time!: Date;
    public distance_covered!: number;
    public created_at!: Date;
    public is_deleted!: boolean;
}

HikingHistory.init({
    history_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    api_trail_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
    },
    end_time: {
        type: DataTypes.DATE,
    },
    distance_covered: {
        type: DataTypes.FLOAT,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'HikingHistory',
    tableName: 'hiking_history',
    timestamps: false,
});

export default HikingHistory;