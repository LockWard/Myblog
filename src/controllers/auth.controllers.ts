import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user.models.js'
import { JWT_SECRET } from '../config/config.js'

// there are 24 hours in seconds
const maxAge = 86400

function createToken(id?: string) {
return jwt.sign({ id }, JWT_SECRET, {

        expiresIn: maxAge

    })
}
// Create register of user
export const signUp = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const { user_name, user_email, user_password, role_id } = req.body
        
        const result = await User.findOne({ where: { user_email: user_email } })

        if (result) {

            return res.status(400).json({ error: 'This Email is already used'})

        }
        else {

            const result = await User.create({
                user_name: user_name,
                user_email: user_email,
                user_password: user_password,
                role_id: role_id,
            })

            return res.status(200).json({ 
                message: `User '${user_name}' created. Token: ` + 
                createToken(result.user_id as unknown as string)
            })
        }
        
    } catch (error) {

        console.error('Error creating user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}
// Login
export const signIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const { user_email, user_password } = req.body

        if(!user_email || !user_password){
            
            return res.status(400).json({ error: 'Please. Send your email or password'})

        }

        const result = await User.findOne({ where: { user_email: user_email} })

        if (!result) {

            return res.status(404).json({ error: `User '${user_email}' not found` })

        }
        
        if (result.user_status == false) {

            return res.status(404).json({ message: 'This account is disabled. Please comnunicated with the administrator.'})

        }
        
        if (user_password && await result.comparePassword(user_password)) {

            return res.status(401).json({ error: 'Invalid credentials' });

        } else {

            return res.status(200).json({ msg: 'Login successful. Token: ' + createToken( result.user_id ) });

        }

    } catch (error) {

        console.error('Error fetching user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}
// Logout
export const signOut = async (_req: Request, res: Response): Promise<Response | any> => {

    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')

}