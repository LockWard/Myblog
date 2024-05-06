import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the sequelize instance

class Role extends Model {
    declare role_id: string;
    declare role_name: string;
    declare created_at: string;
    declare updated_at: string;
}

Role.init(
    {
        role_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        role_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        freezeTableName: true,
        // modelName: 'Role', // Set the model name
    },
)

await Role.sync();
console.log("The table for the Role model was just changes in the table to make it match the model!");

export default Role;