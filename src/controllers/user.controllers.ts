import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import User, { hashPassword } from '../models/user.models.js';

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
    
    const user_id = req.params.user_id;
    
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
    
    const { user_profile, user_handle, user_email, user_first_name, 
        user_last_name, user_description, user_password, role_id } = req.body;
    
    try {
        
/*         const result = await User.findOne({
            where: {
                user_email: user_email,
                user_handle: user_handle
            }
        }); */

        const result = await User.findOne({
            where: {
                [Sequelize.Op.or]:
                    [{ user_email: user_email }, { user_handle: user_handle }],
            },
        });

        if (result) {
            return res.status(400).json({ error: 'This email or handle are already used.' });
        }

        // const role = await Role.findOne({ where: { role_name: ['user'] } });
        
        const user = await User.create({
            user_profile: user_profile,
            user_handle: user_handle,
            user_email: user_email,
            user_first_name: user_first_name,
            user_last_name: user_last_name,
            user_description: user_description,
            user_password: user_password,
            role_id: role_id
        });

        // console.log(user.toJSON());
        return res.status(201).json({ user });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    
    const user_id = req.params.user_id;
    
    const { user_profile, user_handle, user_email, user_first_name, 
        user_last_name, user_description, user_password } = req.body;

    try {
        
        const result = await User.findByPk(user_id);

        if (!result) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        const hashedPassword = await hashPassword(user_password);

        const user = await User.update({
            user_profile: user_profile,
            user_handle: user_handle,
            user_email: user_email,
            user_first_name: user_first_name,
            user_last_name: user_last_name,
            user_description: user_description,
            user_password: hashedPassword
        }, {
            where: { user_id: user_id }
        });

        return res.status(204).json({ user });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    
    const user_id = req.params.user_id;
    
    try {
        
        const result = await User.findByPk(user_id);

        if (!result) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user_status = await User.findOne({ where: { user_id: user_id }});

        const user = await User.update({
            user_status: user_status?.user_status ? false : true
        }, {
            where: { user_id: user_id }
        });

        // console.log(user);
        return res.status(200).json({ user });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}