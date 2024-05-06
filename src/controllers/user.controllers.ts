import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import User from '../models/user.models.js';

export const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        
        const result = await User.findAll(); // Get all users
        
        return res.status(200).json({ result });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    
    const { user_id } = req.params;
    
    try {

        const result = await User.findByPk(user_id); // Find a user by primary key

        if (!result) {

            return res.status(404).json({ error: `User ${user_id} not found.` })

        } else {

            return res.status(200).json({ result });

        }

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const getUserByUserhandle = async (req: Request, res: Response): Promise<Response> => {
    
    const query = req.query.q;
    
    try {

        if (!query) {

            return res.status(404).json({ error: 'Search query parameter "q" is required' });

        }
        
        const result = await User.findAll({
            where: {
                user_handle: {[Sequelize.Op.substring]: query},
            },
        });

        return res.status(200).json({ result });

    }
    catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    
    const { body } = req;
    
    try {

        const [user, result] = await User.findOrCreate({
            where: {
                [Sequelize.Op.or]:
                [{ user_email: body.user_email }, { user_handle: body.user_handle }],
            },
            defaults: body,
        });

        if (!result) {

            return res.status(400).json({ error: 'This email or handle are already used.' });

        }

        return res.status(201).json({ user });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {

    const { user_id } = req.params;
    const { body } = req;

    try {

        const result = await User.findByPk(user_id);

        if (!result) {

            return res.status(404).json({ error: 'User not found.' });

        }

        await result.update(body);
        await result.save();

        return res.status(204).json({ result });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    
    const { user_id } = req.params;
    
    try {
        
        const result = await User.findByPk(user_id);

        if (!result) {

            return res.status(404).json({ error: 'User not found.' });

        }
        
        const user = await User.update({
            user_status: result?.user_status ? false : true
        }, {
            where: { user_id: user_id }
        });

        return res.status(200).json({ user });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}