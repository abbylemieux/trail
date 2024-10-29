import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

class User extends Model {
    id(id: any): string | PromiseLike<string> {
        throw new Error('Method not implemented.');
    }
    public user_id!: number;
    public username!: string;
    public email!: string;
    private password!: string;
    public created_at!: Date;
    public is_deleted!: boolean;

    public async comparePassword(candidatePassword: string): Promise<boolean> {

        return bcrypt.compare(candidatePassword, this.password);}
}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});


export default User;
