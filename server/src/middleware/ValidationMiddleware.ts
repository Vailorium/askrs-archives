import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import logger from '../logger';

function validateBody(schema: Joi.AnySchema, stripUnknown: boolean = false) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = schema.validate(body, { stripUnknown });
    if (error) {
      logger.info(`Body validation failed: ${JSON.stringify(error)}`);
      res.status(400).send();
    } else {
      next();
    }
  };
}

function validateQuery(schema: Joi.AnySchema, stripUnknown: boolean = false) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;
    const { error } = schema.validate(query, { stripUnknown });
    if (error) {
      logger.info(`Query validation failed: ${JSON.stringify(error)}`);
      res.status(400).send();
    } else {
      next();
    }
  };
}

function validateParams(schema: Joi.AnySchema, stripUnknown: boolean = false) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const { error } = schema.validate(params, { stripUnknown });
    if (error) {
      logger.info(`Params validation failed: ${JSON.stringify(error)}`);
      res.status(400).send();
    } else {
      next();
    }
  };
}

export {
  validateBody,
  validateQuery,
  validateParams,
};
