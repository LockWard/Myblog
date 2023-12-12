import { Request, Response } from 'express';

import User from '../models/user.models.js';
// import { v4 as uuidv4 } from 'uuid';
// import { UUIDV4 } from 'sequelize';

export const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        
        const result = await User.findAll() // Create a user

        return res.status(200).json({ result })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.user_id

        const result = await User.findByPk(id) // Find a user by primary key

        return res.status(200).json({ result })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const postUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { user_name, user_email, user_password, user_description, role_id } = req.body
        
        const result = await User.findOne(user_email)

        if (result) {

            return res.status(400).json({ error: 'This email is already used.' })

        }
        
        const user = await User.create({
            user_name: user_name,
            user_email: user_email,
            user_password: user_password,
            user_description: user_description,
            role_id: role_id,
        })

        console.log(user.toJSON())
        return res.status(200).json({ user })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const putUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        // const { id } = req.params.id
        const { user_name, user_email, user_password, user_description, user_status } = req.body
        
        const result = await User.findByPk(req.params.user_id)

        if (result) {

            return res.status(400).json({ error: 'User not found.' })

        }
        
        const user = await User.update({
            user_name: user_name,
            user_email: user_email,
            user_password: user_password,
            user_description: user_description,
            user_status: user_status,
        }, {
            where: { user_id: req.params.user_id }
        })

        console.log(user)
        return res.status(200).json({ user })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const user_id = req.params.user_id
        const { user_status } = req.body
        
        const result = await User.findByPk(user_id)

        if (result) {

            return res.status(400).json({ error: 'User not found.' })

        }
        
        const user = await User.update({
            user_status: user_status,
        }, {
            where: { user_id: user_id }
        })

        console.log(user)
        return res.status(200).json({ user })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}