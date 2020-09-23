'use strict';

const express = require('express');

const router = express.Router();

const getHomeTranslators = require('../controllers/home/get-home-translators-controller');
const getTranslatorsOrdered = require('../controllers/home/get-ordered-translators-controller');

router.get('/home', getHomeTranslators);
router.get('/home/:translatorsOrder', getTranslatorsOrdered);

module.exports = router;
