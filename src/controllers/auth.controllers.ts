import { NextFunction, Request, Response } from 'express';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

import User, { comparePassword } from '../models/user.models.js';
import Role from '../models/role.models.js';
import { JWT_SECRET } from '../config/config.js';

// Create token
function createToken(id?: string, role_id?: string) {
return jwt.sign({ id, role_id }, JWT_SECRET, {

        expiresIn: '8h'

    })
}
// Create register of user
export const signUp = async (req: Request, res: Response): Promise<Response> => {
    
    const { user_profile, user_handle, user_email, user_first_name, 
        user_last_name, user_description, user_password } = req.body;
    
    try {

        const result = await User.findOne({
            where: {
                [Sequelize.Op.or]: 
                    [{ user_email: user_email }, { user_handle: user_handle }],
            },
        });

        if (result) {
            return res.status(400).json({ error: 'This email or handle is already used.' });
        }

        const role = await Role.findOne({ where: { role_name: ['user'] } });

        const user = await User.create({
            user_profile: user_profile,
            user_handle: user_handle,
            user_email: user_email,
            user_first_name: user_first_name,
            user_last_name: user_last_name,
            user_description: user_description,
            user_password: user_password,
            role_id: (role?.role_id)
        });

        return res.status(201).json({

            // message: `User '${user_name}' created. Token: ` + 
            // createToken(result.user_id as unknown as string)

            message: createToken(user.user_id, user.role_id)

        });

    } catch (error) {

        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}
// Login
export const signIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const { user_email_or_handle, user_password } = req.body;

        if(!user_email_or_handle || !user_password){
            return res.status(400).json({ error: 'Please send your email, handle or password.'});
        }

        const result = await User.findOne({
            where: {
                [Sequelize.Op.or]: 
                    [{ user_email: user_email_or_handle }, { user_handle: user_email_or_handle }],
            },
        });

        if (!result) {
            return res.status(404).json({ error: `User '${user_email_or_handle}' not found.` });
        }
        
        if (result.user_status == false) {
            return res.status(404).json({ message: 'This account is disabled. Please comnunicated with the administrator.'});
        }

        const passwordMatch = await comparePassword(user_password, result.user_password);
        
        if (!passwordMatch) {

            return res.status(401).json({ error: 'Invalid credentials.' });
            
        } else {
            
            return res.status(200).json({ message: createToken( result.user_id, result.role_id) });

        }

    } catch (error) {

        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}
// Logout
export const signOut = async (_req: Request, res: Response, next: NextFunction): Promise<Response | any> => {

    res.cookie('jwt', '', { maxAge: 1000 });
    res.redirect('/');
    return next();

}