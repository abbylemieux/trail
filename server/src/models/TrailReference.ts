import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TrailReference extends Model {
    public trail_ref_id!: number;
    public api_trail_id!: string;
    public last_known_name?: string;
    public popularity_score!: number;
    public is_deleted!: boolean;
}

TrailReference.init({
    trail_ref_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    api_trail_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    last_known_name: {
        type: DataTypes.STRING(255),
    },
    popularity_score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'TrailReference',
    tableName: 'trail_references',
    timestamps: false,
});

export default TrailReference;