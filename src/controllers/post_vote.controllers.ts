import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import Post_vote from '../models/post_vote.models.js';

export const createPost_vote = async (req: Request, res: Response): Promise<Response> => {
    
    const { user_id, post_id, post_vote_reaction } = req.body;
    
    try {
        
        const post_vote = await Post_vote.create({
            user_id: user_id,
            post_id: post_id,
            post_vote_reaction: post_vote_reaction
        });

        // console.log(post_vote.toJSON());
        return res.status(201).json({ post_vote });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deletePost_vote = async (req: Request, res: Response): Promise<Response> => {
    
    const { user_id, post_id } = req.body;
    
    try {

        const post_vote = await Post_vote.destroy({
            where: { 
                [Sequelize.Op.and]: 
                    [{ post_id: post_id }, { user_id: user_id }],
            },
        });

        // console.log(post_vote);
        return res.status(200).json({ post_vote });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}