'use strict';

//CONSTANTS
const LATEST = 'latest-translators';
const AZ = 'az-translators';

//MYSQL POOL CONNECTION
const mysqlPool = require('../../../database/mysql-pool');

async function getTranslatorsOrdered(req, res, next) {
  const { TranslatorsOrder } = req.params;

  let connection;
  try {
    connection = await mysqlPool.getConnection();

    //query to obtain the data
    let sqlQuery;

    switch (translatorsOrder) {
      case LATEST:
        sqlQuery = 'SELECT * FROM translators';

        break;
      case AZ:
        sqlQuery = 'SELECT * FROM translators ORDER BY name DESC';
        break;
    }

    const [data] = await connection.execute(sqlQuery);

    connection.release();

    return res.status(200).send(data);
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getTranslatorsOrdered;
