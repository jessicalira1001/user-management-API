const pool = require('../config/db');

const createRefreshToken = async (user_id, token, expires_at) => {
    try{    
    const result = await pool.query('INSERT INTO refresh_tokens ( user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING id, user_id, token, created_at, expires_at', [user_id, token, expires_at]);
        return result.rows[0];

     } catch (error) {
    console.error('Erro ao salvar refresh token:', error);
    throw error;
  }
}

module.exports = {
    createRefreshToken
}