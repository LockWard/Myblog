import Role from '../models/role.models.js';
import User from '../models/user.models.js';

import { ADMIN_HANDLE,
    ADMIN_EMAIL,
    ADMIN_FIRST_NAME,
    ADMIN_LAST_NAME,
    ADMIN_PASSWORD } from '../config/config.js';// Settings to create the user admin

export const createRoles = async () => {
    try {
        const role = await Role.count();

            if (role > 0) {
                console.log('Role admin, moderator and admin are already exist.');
            }
            else {

                await Promise.all([
                    Role.create({ role_name: 'user' }),
                    Role.create({ role_name: 'moderator' }),
                    Role.create({ role_name: 'admin' }),
                ]);

                console.log('Role admin, moderator and user have been created.');    
            }
            
        } catch (error) {

            console.error(error);

        }
    }

export const createAdmin = async () => {
    try {
        // Get id of admin
        const role = await Role.findOne({
            where: { role_name: ['admin']}
        });
        
        // checking for a existing admin user.
        // if not exist, reate a new admin user
        const [user, result] = await User.findOrCreate({

            where: {
                user_email: ADMIN_EMAIL,
            },
            defaults: {
                user_handle: ADMIN_HANDLE,
                user_email: ADMIN_EMAIL,
                user_first_name: ADMIN_FIRST_NAME,
                user_last_name: ADMIN_LAST_NAME,
                user_password: ADMIN_PASSWORD,
                role_id: role?.role_id
            }
            
        });
        // result return a boolean. If it is true return this
        if (result) {

            console.log('The user: ', user.user_handle, ' has been created.');
            console.table([user.dataValues], ['user_handle', 'user_email', 'user_password']);

        } else  {

            console.log('The user admin is already exist.');
            console.table([user.dataValues], ['user_handle', 'user_email', 'user_password']);

        }

    } catch (error) {

        console.error(error);

    }
}

createRoles();
setTimeout(createAdmin, 1000);
// createAdmin();