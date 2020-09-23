'use strict';

const mysqlPool = require('../../../database/mysql-pool');
const Joi = require('@hapi/joi');
const uuidV4 = require('uuid/v4');

async function validateSchema(payload) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(45).required(),
    description: Joi.string().trim().min(1).max(255).required(),
    details: Joi.string().trim().min(1).max(65536).required(),
    category: Joi.string().trim().required(),
    language: Joi.string().trim().required(),
  });

  Joi.assert(payload, schema);
}

async function createProfile(req, res, next) {
  const { userId } = req.claims;
  const translatorData = { ...req.body };

  try {
    await validateSchema(translatorData);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;

  try {
    connection = await mysqlPool.getConnection();
    const now = new Date().toISOString().substring(0, 19).replace('T', ' ');

    const translatorId = uuidV4();

    const sqlCreateProfile = `INSERT INTO translators
    SET translator_id = ?,
    user_id = ?,
    title = ?,
    description = ?,
    details = ?,
    category = ?,
    language = ?,
    created_at = ?`;

    await connection.query(sqlCreateProfile, [
      translatorId,
      userId,
      translatorData.title,
      translatorData.description,
      translatorData.details,
      translatorData.category,
      translatorData.language,
      now,
    ]);

    connection.release();
    return res.status(201).send('Perfil creado');
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

module.exports = createProfile;
