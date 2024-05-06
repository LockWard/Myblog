import { Request, Response, NextFunction, RequestHandler } from 'express';

import Role from '../models/role.models.js';

export const isAdmin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

/*         req.body = req.user
        const roleIds: string[] = [req.body].map(user => {
            if (user !== undefined) {
                return user.dataValues.role_id;
            } else {
                return ''; // Or handle the case where 'user' is undefined
            }
        }); */

        const result = req.body.dataValues?.role_id;

        const role = await Role.findByPk(result);
        
        if (role?.role_name == 'admin') {

            return next();

        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
        
    } catch (error) {
        
        return res.status(500).send({ message: error });
        
    }
}

export const isModerator: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

/*         req.body = req.user;
        const roleIds: string[] = [req.body].map(user => {
            if (user !== undefined) {
                return user.dataValues.role_id;
            } else {
                return ''; // Or handle the case where 'user' is undefined
            }
        }); */

        const result = req.body.dataValues.role_id;
        
        const role = await Role.findByPk(result);

        if (role?.role_name == 'moderator' || role?.role_name == 'admin') {

            return next();

        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }

    } catch (error) {

        return res.status(500).send({ message: error });

    }
}

/* export const checkRole = (roles: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {      
        try {

            req.body = req.user
            const roleIds: string[] = [req.body].map(user => {
                if (user !== undefined) {
                    return user.dataValues.role_id;
                } else {
                    return ''; // Or handle the case where 'user' is undefined
                }
            });
    
            const role = await Role.findByPk(roleIds[0]);
    
            if (role?.role_name == roles) {
    
                return next();
    
            } else {
    
                res.status(403).json({ message: 'Unauthorized' });
    
            }
    
        } catch (error) {
    
            return res.status(500).send({ message: error });
    
        }
    };
} */