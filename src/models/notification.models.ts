import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the sequelize instance
import User from './user.models.js'; // Import the Sequelize model for the foreign key

class Notification extends Model {
    declare notification_id: string;
    declare notification_type: string;
    declare recipient_id: string;
    declare sender_id: string;
    declare created_at: string;
}

Notification.init(
    {
        notification_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        notification_type: {
            type: DataTypes.ENUM('post', 'message', 'follow', 'upvote', 'downvote'),
            allowNull: false,
        },
        recipient_id: {
            type: DataTypes.UUID,
            allowNull: false,
            
            references: {
                model: User,
                key: 'user_id',
            }
        },
        sender_id: {
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
        updatedAt: false,
        timestamps: true,
        freezeTableName: true,
        // modelName: 'Notification', // Set the model name
    }
)

await Notification.sync();
console.log("The table for the Notification model was just changes in the table to make it match the model!");

export default Notification;