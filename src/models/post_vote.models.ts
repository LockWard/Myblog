import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance

import User from './user.models.js'; // Import the Sequelize model for the foreign key
import Post from './post.models.js'; // the same here

class Post_vote extends Model {
    declare user_id: string;
    declare post_id: string;
    declare post_vote_reaction: string;
    declare created_at: string;
}

Post_vote.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,

            references: {
                model: User,
                key: 'user_id',
            }
        },
        post_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            
            references: {
                model: Post,
                key: 'post_id',
            }
        },
        post_vote_reaction: {
            type: DataTypes.ENUM('Like', 'Dislike'),
            defaultValue: null,
        },
    },
    {
        sequelize,
        createdAt: 'created_at',
        timestamps: true,
        freezeTableName: true,
        // modelName: 'Post_vote', // Set the model name
    }
)

await Post_vote.sync();
console.log("The table for the Post_vote model was just changes in the table to make it match the model!");

export default Post_vote;