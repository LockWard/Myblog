import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import Follower from '../models/follower.models.js';

export const createFollower = async (req: Request, res: Response): Promise<Response> => {
    
    const { follower_id, following_id } = req.body;
    
    try {
        
        const follower = await Follower.create({
            follower_id: follower_id,
            following_id: following_id
        });

        // console.log(follower.toJSON());
        return res.status(201).json({ follower });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deleteFollower = async (req: Request, res: Response): Promise<Response> => {
    
    const { follower_id, following_id } = req.body;
    
    try {

        const follower = await Follower.destroy({
            where: { 
                [Sequelize.Op.and]: 
                    [{ follower_id: follower_id }, { following_id: following_id }],
            },
        });

        // console.log(follower);
        return res.status(200).json({ follower });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}