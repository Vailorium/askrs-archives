import {
  NextFunction, Request, Response, Router,
} from 'express';
import Controller from '../interfaces/Controller';
import logger from '../logger';

class RequestLoggerMiddleware implements Controller {
  router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.logRequest);
  }

  private logRequest = async (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      const requestData = {
        ip: req.ip,
        url: req.url,
        method: req.method,
        params: req.params,
        query: req.query,
        secure: req.secure,
        status: res.statusCode,
      };

      if (res.statusCode < 500) {
        logger.info(JSON.stringify(requestData));
      } else {
        logger.error(JSON.stringify(requestData));
      }
    });
    next();
  }
}
export default RequestLoggerMiddleware;
