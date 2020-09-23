'use strict';

const accountRouter = require('./account-router');
const userRouter = require('./user-router');
const homeRouter = require('./home-router');
const translatorsRouter = require('./translators-router');
const searchRouter = require('./search-router');

module.exports = {
  accountRouter,
  userRouter,
  homeRouter,
  translatorsRouter,
  searchRouter,
};
