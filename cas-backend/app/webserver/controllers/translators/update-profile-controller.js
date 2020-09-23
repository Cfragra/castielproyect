'use strict';

const mysqlPool = require('../../../database/mysql-pool');

const Joi = require('@hapi/joi');

async function validateSchema(payload) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(45).required(),
    description: Joi.string().trim().min(1).max(255).required(),
    details: Joi.string().trim().min(1).max(65536).required(),
    translatorId: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
  });

  Joi.assert(payload, schema);
}

async function updateProfile(req, res, next) {
  const { translatorId } = req.params;
  const { title, description, details, category, language } = req.body;
  const translatorData = { title, description, details, translatorId };

  try {
    await validateSchema(translatorData);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;

  try {
    connection = await mysqlPool.getConnection();
    const now = new Date().toISOString().substring(0, 19).replace('T', ' ');

    const sqlQuery = `UPDATE translators SET 
      title = ?,
      description = ?,
      details = ?,
      category = ?,
      language = ?,
      updated_at = ?
      WHERE translator_id = ?`;

    await connection.query(sqlQuery, [
      title,
      description,
      details,
      category,
      language,
      now,
      translatorId,
    ]);

    connection.release();

    res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    return res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = updateProfile;
