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
    
    const comment_id = req.params.comment_id;
    
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
    
    const { comment_text, user_id, post_id } = req.body;
    
    try {
        
        const comment = await Comment.create({
            comment_text: comment_text,
            user_id: user_id,
            post_id: post_id
        });

        // console.log(comment.toJSON());
        return res.status(201).json({ comment });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const updateComment = async (req: Request, res: Response): Promise<Response> => {
    
    const comment_id = req.params.comment_id;
    const { comment_text, post_id } = req.body;
    
    try {
        
        const result = await Comment.findByPk(comment_id);

        if (!result) {
            return res.status(404).json({ error: 'Comment not found.' });
        }
        
        const comment = await Comment.update({
            comment_text: comment_text,
        }, {
            where: { 
                [Sequelize.Op.and]:
                    [{ comment_id: comment_id }, { post_id: post_id}, { user_id: result.user_id }],
            }
        });

        // console.log(comment)
        return res.status(204).json({ comment });
        // return res.status(200).json(comment[0])

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
    
    const comment_id = req.params.comment_id;
    
    try {
        
        const result = await Comment.findByPk(comment_id);

        if (!result) {
            return res.status(404).json({ error: 'Comment not found.' });
        }
        
        const comment_status = await Comment.findOne({ where: { comment_id: comment_id }});

        const comment = await Comment.update({
            comment_status: comment_status?.comment_status ? false : true
        }, {
            where: { comment_id: comment_id }
        });

        // console.log(comment);
        return res.status(200).json({ comment });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}