'use strict';

const {Router} = require(`express`);
const mainRouter = require(`./main`);
const myRouter = require(`./my`);
const articlesRouter = require(`./articles`);

const router = new Router();

router.use(`/`, mainRouter);
router.use(`/my`, myRouter);
router.use(`/articles`, articlesRouter);

module.exports = router;
