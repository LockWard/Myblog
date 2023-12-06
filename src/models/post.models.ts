import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import User from './user.models.js'; // Import the Sequelize model for the foreign key

class Post extends Model {
    declare post_id: string;
    declare post_title: string;
    declare post_content: string;
    declare post_media: string;
    declare post_status: boolean;
    declare created_at: string;
    declare updated_at: string;
    declare user_id: string;
}

Post.init(
    {
        post_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_media: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        post_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            
            references: {
                model: User,
                key: 'user_id',
            }
        },
    },
    {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        freezeTableName: true,
        modelName: 'Post', // Set the model name
    }
)

/* await Post.sync({ alter: true})
console.log("The table for the Post model was just changes in the table to make it match the model!") */

export default Post