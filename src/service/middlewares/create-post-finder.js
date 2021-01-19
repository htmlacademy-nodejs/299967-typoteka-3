'use strict';

const {HttpStatusCode} = require(`../../const`);
const {logger, LogMessage} = require(`../../logger`);

const createPostFinder = (service) => (req, res, next) => {
  const id = req.params.articleId;
  const post = service.getPost(id);

  if (!post) {
    const message = LogMessage.getWrongObjectID(`Post`, id);
    logger.error(message);
    res.status(HttpStatusCode.BAD_REQUEST).send(message);
    return;
  }

  logger.debug(LogMessage.printObject(`Post`, post));
  res.locals.post = post;
  next();
};

module.exports = {
  createPostFinder
};
