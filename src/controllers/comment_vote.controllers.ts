import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import Comment_vote from '../models/comment_vote.models.js';

export const createComment_vote = async (req: Request, res: Response): Promise<Response> => {
    
    const { user_id, comment_id, comment_vote_reaction } = req.body;
    
    try {
        
        const comment_vote = await Comment_vote.create({
            user_id: user_id,
            comment_id: comment_id,
            comment_vote_reaction: comment_vote_reaction
        });

        // console.log(comment_vote.toJSON());
        return res.status(201).json({ comment_vote });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deleteComment_vote = async (req: Request, res: Response): Promise<Response> => {
    
    const { user_id, comment_id } = req.body;
    
    try {

        const comment_vote = await Comment_vote.destroy({
            where: { 
                [Sequelize.Op.and]: 
                    [{ comment_id: comment_id }, { user_id: user_id }],
            },
        });

        // console.log(comment_vote);
        return res.status(200).json({ comment_vote });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}