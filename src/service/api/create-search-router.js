'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../const`);
const {logger, LogMessage} = require(`../../logger`);

const createSearchRouter = (service) => {
  const router = new Router();

  router.get(`/`, (req, res) => {
    const query = req.query.query;
    const foundPosts = service.search(query);
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    logger.debug(foundPosts);
    res.status(HttpStatusCode.OK).json(foundPosts);
  });

  return router;
};

module.exports = {
  createSearchRouter
};
