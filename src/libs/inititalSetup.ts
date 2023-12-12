import Role from '../models/role.models.js'
import User from '../models/user.models.js'

import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from '../config/config.js'// Settings to create the user admin

export const createRoles = async () => {
    try {

        const role = await Role.findAll()

            if (role.length > 0) {
        
                console.log('Role admin, moderator and admin are already exist.')

            }
            else {
                
                const value = await Promise.all([
                    Role.create({ role_name: 'admin' }),
                    Role.create({ role_name: 'moderator' }),
                    Role.create({ role_name: 'user' }),
                ])

                console.log(value)
                console.log('Role admin, moderator and user have been created.')
        
            }

    } catch (error) {

        console.error(error)

    }
}

export const createAdmin = async () => {
    try {
        // Get id of admin
        const [role] = await Role.findAll({
            where: { role_name: ['admin']}
        })
        
        // checking for a existing admin user.
        // if not exist, reate a new admin user
        const [user, result] = await User.findOrCreate({
            where: {
                user_email: ADMIN_EMAIL,
            },
            defaults: {
                user_email: ADMIN_EMAIL,
                user_name: ADMIN_USERNAME,
                user_password: ADMIN_PASSWORD,
                role_id: (role.role_id)
            }
        })
        // result return a boolean. If it is true return this
        if (result) {

            console.log('The user: ', user.user_name, ' has been created')

        } else  {

            console.log('The user admin is already exist.')

        }

    } catch (error) {

        console.error(error)

    }
}

createRoles()
createAdmin()