import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import User from './user.models.js'; // Import the Sequelize model for the foreign key

class Post extends Model {
    declare post_id: string;
    declare post_title: string;
    declare post_text: string;
    declare post_media: string;
    declare post_num_votes: number;
    declare post_num_comments: number;
    declare post_num_shared: number;
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
            type: DataTypes.STRING(125),
            allowNull: false,
        },
        post_text: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
        post_media: {
            type: DataTypes.STRING,
            allowNull: true,

            validate: {
                isUrl: true,
            }
        },
        post_num_votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        post_num_comments: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        post_num_shared: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        // modelName: 'Post', // Set the model name
    }
)

await Post.sync();
console.log("The table for the Post model was just changes in the table to make it match the model!");

export default Post;