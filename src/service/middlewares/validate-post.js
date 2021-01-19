'use strict';

const {HttpStatusCode} = require(`../../const`);
const {logger} = require(`../../logger`);

const requiredFields = [`title`, `createdDate`, `fullText`, `categories`, `announce`];

const validatePost = (req, res, next) => {
  const post = req.body;

  if (!post) {
    const err = `Post is empty`;
    logger.error(err);
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
    return;
  }

  const isValid = requiredFields.reduce((acc, cur) => {
    return acc && (cur in post);
  }, true);

  if (!isValid) {
    const err = `Post should contain following fields: ${requiredFields.join(`, `)}, but doesn't contain some`;
    logger.error(err);
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
    return;
  }

  next();
};

module.exports = {
  validatePost
};
