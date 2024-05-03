import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/connection.js'; // Import the Sequelize instance
import User from './user.models.js'; // Import the Sequelize model for the foreign key

class Direct_message extends Model {
    declare message_id: string;
    declare message_text: string;
    declare message_status: boolean;
    declare created_at: string;
    declare updated_at: string;
    declare sender_id: string;
    declare receiver_id: string;
}

Direct_message.init(
    {
        message_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        message_text: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        message_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        sender_id: {
            type: DataTypes.UUID,
            allowNull: false,
            
            references: {
                model: User,
                key: 'user_id',
            }
        },
        receiver_id: {
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
        // modelName: 'Direct_message', // Set the model name
    }
)

await Direct_message.sync();
console.log("The table for the Direct_message model was just changes in the table to make it match the model!");

export default Direct_message;