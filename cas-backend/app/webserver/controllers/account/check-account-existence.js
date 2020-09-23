'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function checkExistenceAccount(email) {
  const sqlQuery = `SELECT *
    FROM users
	WHERE email = '${email}' 
	AND deleted_at IS NULL`;

  const connection = await mysqlPool.getConnection();
  const [rows] = await connection.query(sqlQuery);
  connection.release();

  return rows;
}

module.exports = checkExistenceAccount;
