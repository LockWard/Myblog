import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import Role from './role.models.js'; // Import the Sequelize model for the foreign key

class User extends Model {
    declare user_id: string;
    declare user_name: string;
    declare user_email: string;
    declare user_password: string;
    declare user_description: string;
    declare user_status: boolean;
    declare created_at: string;
    declare updated_at: string;
    declare role_id: string;
}

User.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        user_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,

            references: {
                model: Role,
                key: 'role_id',
            }
        },
    },
    {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        freezeTableName: true,
        modelName: 'User', // Set the model name
    }
)

/* await User.sync({ alter: true})
console.log("The table for the User model was just changes in the table to make it match the model!") */

export default User