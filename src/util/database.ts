// Chapter 10.1 - For database connection configuration and pool creation we first need to import the postgres
//      object(driver) which we installed with : "npm install --save pg"
const { Pool } = require('pg')

// 10.2: Configure a connection pool with data base connection information
const pool = new Pool({
    user: 'yb@yb.com',
    host: 'localhost',
    database: 'postgres',
    password: '14Raspberry',
    port: 5432,
});

module.exports = pool ;