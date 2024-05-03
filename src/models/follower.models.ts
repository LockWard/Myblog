import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance

import User from './user.models.js'; // Import the Sequelize model for the foreign key

class Follower extends Model {
    declare follower_id: string;
    declare following_id: string;
    declare created_at: string;
}

Follower.init(
    {
        follower_id: {
            type: DataTypes.UUID,
            primaryKey: true,

            references: {
                model: User,
                key: 'user_id',
            }
        },
        following_id: {
            type: DataTypes.UUID,
            primaryKey: true,

            references: {
                model: User,
                key: 'user_id',
            }
        },
    },
    {
        sequelize,
        createdAt: 'created_at',
        timestamps: true,
        freezeTableName: true,
        // modelName: 'Follower', // Set the model name

        validate: {
            checkFollowerFollowing: function() {
                if (this.follower_id === this.following_id) {

                    throw new Error('Follower ID and Following ID must be different.');
                    
                }
            }
        }
    }
)

/* Follower.beforeCreate(async (Follower) => {
    if (Follower.follower_id == Follower.following_id) {

        throw new Error('Follower ID and Following ID must be different.');
        
    }
});

Follower.beforeUpdate(async (Follower) => {
    if (Follower.changed('follower_id') == Follower.changed('follower_id')) {

        throw new Error('Follower ID and Following ID must be different.');
        
    }
});
 */
await Follower.sync();
console.log("The table for the Follower model was just changes in the table to make it match the model!");

export default Follower;