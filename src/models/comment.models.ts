import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import User from './user.models.js'; // Import the Sequelize model for the foreign key
import Post from './post.models.js'; // ...

class Comment extends Model {
    declare comment_id: string;
    declare comment_content: string;
    declare comment_status: boolean;
    declare created_at: string;
    declare updated_at: string;
    declare user_id: string;
    declare post_id: string;
}

Comment.init(
    {
        comment_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_status: {
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
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
            
            references: {
                model: Post,
                key: 'post_id',
            }
        },
    },
    {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        freezeTableName: true,
        modelName: 'Comment', // Set the model name
    }
)

/* await Comment.sync({ alter: true})
console.log("The table for the Comment model was just changes in the table to make it match the model!") */

export default Comment