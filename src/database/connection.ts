import { Sequelize } from 'sequelize'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../config/config.js'

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
})

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

/* sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    })
    .finally(() => {
        sequelize.close();
    });
 */
/* async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection() */

/* (async () => {
    await sequelize.sync({ force: true });
    // Code here
})(); */