import { DataTypes, Model } from 'sequelize';
import sequelize from '';

class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'User',
});

export default User;
