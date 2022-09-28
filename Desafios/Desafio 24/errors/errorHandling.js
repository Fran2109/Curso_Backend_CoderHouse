import logger from "./../logs/index.js";

export const errorHandling = (err, req, res, next) => {
    logger.error(err.stack);
    next(err);
}