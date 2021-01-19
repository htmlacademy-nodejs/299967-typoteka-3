'use strict';

const {HttpStatusCode} = require(`../../const`);
const {logger, LogMessage} = require(`../../logger`);

const createCommentFinder = (service) => (req, res, next) => {
  const {articleId, commentId} = req.params;

  const post = service.getPost(articleId);
  if (!post) {
    const message = LogMessage.getWrongObjectID(`Post`, articleId);
    logger.error(message);
    res.status(HttpStatusCode.BAD_REQUEST).send(message);
    return;
  }

  const comment = service.getComment(articleId, commentId);
  if (!comment) {
    const message = LogMessage.getWrongObjectID(`Comment`, commentId);
    logger.error(message);
    res.status(HttpStatusCode.BAD_REQUEST).send(message);
    return;
  }

  logger.debug(LogMessage.printObject(`Comment`, comment));
  next();
};

module.exports = {
  createCommentFinder
};
