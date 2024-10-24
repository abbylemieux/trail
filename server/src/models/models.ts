import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Trail = sequelize.define('Trail', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Trail;
