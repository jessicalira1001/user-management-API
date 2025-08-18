const pool = require('../config/db');

const createUser = async (name, email, password) => {
    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at', [name, email, password]);
    return result.rows[0];
}

module.exports = {
    createUser
}

