//  11.1.1.1 - With Sequelizer, the way we connect to the database is different than what we have used in Chapter 10.
import { Sequelize } from 'sequelize-typescript'

// 11.1.1.2 : to connect ot the database we instantiate a Sequelize object, providing db name, dialect, credentials and
//        the directory which holds our models.
const sequelize = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'yb@yb.com',
    password: '14Raspberry',
    // storage: ':memory:',
    models: [__dirname + '/models'] // Specifies the directory where models can be found
})

module.exports = sequelize;
