import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import Role from './role.models.js'; // Import the Sequelize model for the foreign key
// import Follower from './follower.models.js';

class User extends Model {
    declare user_id: string;
    declare user_profile: string;
    declare user_handle: string;
    declare user_email: string;
    declare user_first_name: string;
    declare user_last_name: string;
    declare user_follower_count: number;
    declare user_description: string;
    declare user_password: string; // Stored hashed password
    declare user_status: boolean;
    declare created_at: string;
    declare updated_at: string;
    declare role_id: string;

/*     async comparePassword(password: string): Promise<boolean> {

        return bcrypt.compare(password, this.user_password);

    } */
}

User.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        user_profile: {
            type: DataTypes.STRING,

            validate: {
                isUrl: true,
            }
        },
        user_handle: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,

            validate: {
                len: [6, 100],
            }
        },
        user_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,

            validate: {
                isEmail: true,
            }
        },
        user_first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,

            validate: {
                len: [3, 100],
            }
        },
        user_last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,

            validate: {
                len: [3, 100],
            }
        },
        user_follower_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        user_description: {
            type: DataTypes.TEXT('tiny'),
            allowNull: true,
        },
        user_password: {
            type: DataTypes.STRING(125),
            allowNull: false,

            validate: {
                len: [7, 125],
            }
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
        // modelName: 'User', // Set the model name
    }
)

User.beforeCreate(async (user) => {

    const hashedPassword = await bcrypt.hash(user.user_password, 10);
    user.user_password = hashedPassword;

});

/* User.beforeUpdate(async (user) => {
    if (user.changed('user_password')) {

        const hashedPassword = await bcrypt.hash(user.user_password, 10);
        user.user_password = hashedPassword;
        
    }
}); */

export const hashPassword = async (user_password: string): Promise<string> => {

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(user_password, salt);
}

/* Follower.afterCreate(async (Follower) => {
    try {
        // Increment the follower count for the user being followed
        await User.increment('user_follower_count', { by: 1, where: { user_id: Follower.following_id } });
    } catch (error) {
        console.error('Error updating user follower count:', error);
    }
}); */

export const comparePassword = async (user_password: string, user_password_received: string): Promise<boolean> => {

    return bcrypt.compare(user_password, user_password_received);

}

await User.sync();
console.log("The table for the User model was just changes in the table to make it match the model!");

export default User;