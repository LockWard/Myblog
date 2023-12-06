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