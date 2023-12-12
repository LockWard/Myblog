import { Request, Response } from 'express';

import Comment from '../models/comment.models.js';
// import { v4 as uuidv4 } from 'uuid';
// import { UUIDV4 } from 'sequelize';

export const getAllComments = async (_req: Request, res: Response): Promise<Response> => {
    try {
        
        const result = await Comment.findAll() // Create a user
        
        return res.status(200).json(result)

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getCommentById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const comment_id = req.params.user_id

        const result = await Comment.findByPk(comment_id) // Find a user by primary key

        return res.status(200).json({ result })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const postComment = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { comment_content, user_id, post_id } = req.body
        
        const comment = await Comment.create({
            comment_content: comment_content,
            user_id: user_id,
            post_id: post_id,
        })

        console.log(comment.toJSON())
        return res.status(200).json({ comment })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const putComment = async (req: Request, res: Response): Promise<Response> => {
    try {

        // const { id } = req.params.id
        const { comment_content, user_id, post_id } = req.body
        
        const result = await Comment.findByPk(req.params.comment_id)

        if (result) {

            return res.status(400).json({ error: 'Comment not found.' })

        }
        
        const comment = await Comment.update({
            comment_content: comment_content,
            user_id: user_id,
            post_id: post_id,
        }, {
            where: { comment_id: req.params.comment_id }
        })

        console.log(comment)
        return res.status(200).json({ comment })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
    try {

        const comment_id = req.params.comment_id
        const { comment_status } = req.body
        
        const result = await Comment.findByPk(comment_id)

        if (result) {

            return res.status(400).json({ error: 'Comment not found.' })

        }
        
        const comment = await Comment.update({
            comment_status: comment_status,
        }, {
            where: { comment_id: comment_id }
        })

        console.log(comment)
        return res.status(200).json({ comment })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}