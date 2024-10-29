import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Review extends Model {
    public review_id!: number;
    public user_id!: number;
    public api_trail_id!: string;
    public rating!: number;
    public comment?: string;
    public created_at!: Date;
    public is_deleted!: boolean;
}

Review.init({
    review_id: {
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
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
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
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false,
});

export default Review;