import { Request, Response } from 'express';

import Vote from '../models/vote.models.js';
// import { v4 as uuidv4 } from 'uuid';
// import { UUIDV4 } from 'sequelize';

export const getAllVotes = async (_req: Request, res: Response): Promise<Response> => {
    try {
        
        const result = await Vote.findAll() // Create a user

        return res.status(200).json({ result })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getVoteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.user_id

        const result = await Vote.findByPk(id) // Find a user by primary key

        return res.status(200).json({ result })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const postVote = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { vote_type, user_id, comment_id, post_id } = req.body
        
        const vote = await Vote.create({
            vote_type: vote_type,
            user_id: user_id,
            comment_id: comment_id,
            post_id: post_id,
        })

        console.log(vote.toJSON())
        return res.status(200).json({ vote })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const putVote = async (req: Request, res: Response): Promise<Response> => {
    try {

        // const { id } = req.params.id
        const { vote_type, user_id, comment_id, post_id } = req.body
        
        const result = await Vote.findByPk(req.params.vote_id)

        if (result) {

            return res.status(400).json({ error: 'Vote not found.' })

        }
        
        const vote = await Vote.update({
            vote_type: vote_type,
            user_id: user_id,
            comment_id: comment_id,
            post_id: post_id,
        }, {
            where: { vote_id: req.params.vote_id }
        })

        console.log(vote)
        return res.status(200).json({ vote })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const deleteVote = async (req: Request, res: Response): Promise<Response> => {
    try {

        const vote_id = req.params.vote_id
        const { vote_status } = req.body
        
        const result = await Vote.findByPk(vote_id)

        if (result) {

            return res.status(400).json({ error: 'Vote not found.' })

        }
        
        const vote = await Vote.update({
            vote_status: vote_status,
        }, {
            where: { vote_id: vote_id }
        })

        console.log(vote)
        return res.status(200).json({ vote })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}