import { DataType, Model } from 'sequelize-typescript';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import Role from './role.models.js'; // Import the Sequelize model for the foreign key
import bcrypt from 'bcrypt'

class User extends Model {
    declare user_id: string;
    declare user_name: string;
    declare user_email: string;
    declare user_password: string; // Stored hashed password
    declare user_description: string;
    declare user_status: boolean;
    declare created_at: string;
    declare updated_at: string;
    declare role_id: string;

    static async hashPassword(instance: User) {

        if (instance.changed('user_password')) {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(instance.user_password, saltRounds);

        instance.user_password = hashedPassword;

    }
    }

    async comparePassword(password: string): Promise<boolean> {

        return bcrypt.compare(password, this.user_password);

    }
    
}

User.init(
    {
        user_id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV4,
        },
        user_name: {
            type: DataType.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        user_password: {
            type: DataType.STRING,
            allowNull: false,
        },
        user_description: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
        },
        user_status: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        role_id: {
            type: DataType.UUID,
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