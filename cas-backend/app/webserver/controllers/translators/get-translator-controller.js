'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getTranslator(req, res, next) {
  const { translatorId } = req.params;

  try {
    const connection = await mysqlPool.getConnection();

    const sqlQuery = `SELECT * FROM translators WHERE translator_id = "${translatorId}"`;
    const [rows] = await connection.execute(sqlQuery);
    connection.release();

    if (rows.length !== 1) {
      return res.status(404).send('El perfil no existe');
    }

    const [translator] = rows;

    return res.status(200).send(translator);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getTranslator;
