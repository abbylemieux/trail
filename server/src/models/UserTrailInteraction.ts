import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserTrailInteraction extends Model {
    public interaction_id!: number;
    public user_id!: number;
    public api_trail_id!: string;
    public interaction_type!: 'view' | 'completed' | 'saved';
    public interaction_date!: Date;
    public is_deleted!: boolean;
}

UserTrailInteraction.init({
    interaction_id: {
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
    interaction_type: {
        type: DataTypes.ENUM('view', 'completed', 'saved'),
        allowNull: false,
    },
    interaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'UserTrailInteraction',
    tableName: 'user_trail_interactions',
    timestamps: false,
});

export default UserTrailInteraction;