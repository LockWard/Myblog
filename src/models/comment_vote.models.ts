import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance

import User from './user.models.js'; // Import the Sequelize model for the foreign key
import Comment from './comment.models.js'; // the same here

class Comment_vote extends Model {
    declare user_id: string;
    declare comment_id: string;
    declare comment_vote_reaction: string;
    declare created_at: string;
}

Comment_vote.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,

            references: {
                model: User,
                key: 'user_id',
            }
        },
        comment_id: {
            type: DataTypes.UUID,
            primaryKey: true,

            references: {
                model: Comment,
                key: 'comment_id',
            }
        },
        comment_vote_reaction: {
            type: DataTypes.ENUM('Like', 'Dislike'),
            defaultValue: null,
        }
    },
    {
        sequelize,
        createdAt: 'created_at',
        timestamps: true,
        freezeTableName: true,
        // modelName: 'Comment_vote', // Set the model name
    }
)

await Comment_vote.sync();
console.log("The table for the Comment_vote model was just changes in the table to make it match the model!");

export default Comment_vote;