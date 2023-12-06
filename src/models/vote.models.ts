import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import User from './user.models.js'; // Import the Sequelize model for the foreign key
import Post from './post.models.js'; // ...
import Comment from './comment.models.js'; // ...

class Vote extends Model {
    declare vote_id: string;
    declare vote_type: boolean;
    declare vote_status: boolean;
    declare created_at: string;
    declare updated_at: string;
    declare user_id: string;
    declare post_id: string;
    declare comment_id: string;
}

Vote.init(
    {
        vote_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        vote_type: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
        vote_status: {
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
        comment_id: {
            type: DataTypes.UUID,
            allowNull: false,
            
            references: {
                model: Comment,
                key: 'comment_id',
            }
        },
    },
    {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        freezeTableName: true,
        modelName: 'Vote', // Set the model name
    }
)   

/* await Vote.sync({ alter: true})
console.log("The table for the Vote model was just changes in the table to make it match the model!") */

export default Vote