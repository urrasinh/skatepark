

const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1313',
    database: 'skatepark', 
    port: 5432,
})



module.exports = {} //expt consultas