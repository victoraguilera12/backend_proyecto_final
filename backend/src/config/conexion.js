const { Pool } = require('pg');
const { db_user, db_password, db_name } = require('./config');

const pool = new Pool({
    host: 'localhost',
    user: db_user,
    password: db_password,
    database: db_name,
    allowExitOnIdle: true
});

module.exports = pool;