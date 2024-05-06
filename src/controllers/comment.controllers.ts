import { Request, Response } from 'express';

import Comment from '../models/comment.models.js';
import Sequelize from 'sequelize';

export const getAllComments = async (_req: Request, res: Response): Promise<Response> => {
    try {
        
        const result = await Comment.findAll(); // Create a Comment

        return res.status(200).json({ result });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const getCommentById = async (req: Request, res: Response): Promise<Response> => {
    
    const { comment_id } = req.params;
    
    try {

        const result = await Comment.findByPk(comment_id); // Find a Comment by primary key

        if (!result) {

            return res.status(404).json({ error: `Comment ${comment_id} not found.`});

        } else {

            return res.status(200).json({ result });

        }

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const createComment = async (req: Request, res: Response): Promise<Response> => {
    
    const { body } = req;
    
    try {
        
        const comment = await Comment.create(body);

        return res.status(201).json({ comment });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const updateComment = async (req: Request, res: Response): Promise<Response> => {
    
    const { comment_id } = req.params;
    const { body } = req;
    
    try {
        
        const result = await Comment.findByPk(comment_id);

        if (!result) {
            return res.status(404).json({ error: 'Comment not found.' });
        }
        
        const comment = await Comment.update(body, {
            where: { 
                [Sequelize.Op.and]:
                    [{ comment_id: comment_id }, { post_id: body.post_id}, { user_id: result.user_id }],
            }
        });

        return res.status(204).json({ comment });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
    
    const { comment_id } = req.params;
    
    try {
        
        const result = await Comment.findByPk(comment_id);

        if (!result) {

            return res.status(404).json({ error: 'Comment not found.' });

        }

        const comment = await Comment.update({
            comment_status: result?.comment_status ? false : true
        }, {
            where: { comment_id: comment_id }
        });

        return res.status(200).json({ comment });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}