import { Request, Response, NextFunction } from 'express';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

import User, { comparePassword } from '../models/user.models.js';
import Role from '../models/role.models.js';
import { JWT_SECRET } from '../config/config.js';

// Create token
function createToken(user_id?: string, role_id?: string) {
return jwt.sign({ user_id, role_id }, JWT_SECRET, {

        expiresIn: '8h'

    })
}
// Create register of user
export const signUp = async (req: Request, res: Response): Promise<Response> => {
    
    const { body } = req;
    
    try {
        
        const role = await Role.findOne({ where: { role_name: ['user'] } });

        const [user, result] = await User.findOrCreate({
            where: {
                [Sequelize.Op.or]:
                [{ user_email: body.user_email }, { user_handle: body.user_handle }],
            },
            defaults: {
                user_profile: body.user_profile,
                user_handle: body.user_handle,
                user_email: body.user_email,
                user_first_name: body.user_first_name,
                user_last_name: body.user_last_name,
                user_description: body.user_description,
                user_password: body.user_password,
                role_id: role?.role_id
            },
        });

        if (!result) {

            return res.status(400).json({ error: 'This email or handle are already used.' });

        }
        
        return res.status(201).json({ message: createToken(user.user_id, user.role_id )});

    } catch (error) {

        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}
// Login
export const signIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const { body } = req;

        if(!body.user_email_or_handle || !body.user_password){

            return res.status(400).json({ error: 'Please send your email, handle or password.'});

        }

        const result = await User.findOne({
            where: {
                [Sequelize.Op.or]: 
                    [{ user_email: body.user_email_or_handle }, { user_handle: body.user_email_or_handle }],
            },
        });

        if (!result) {

            return res.status(404).json({ error: `User '${body.user_email_or_handle}' not found.` });

        }
        
        if (result.user_status == false) {

            return res.status(404).json({ message: 'This account is disabled. Please comnunicated with the administrator.'});

        }

        const passwordMatch = await comparePassword(body.user_password, result.user_password);
        
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