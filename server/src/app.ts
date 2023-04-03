import { Server } from 'http';
import * as bodyParser from 'body-parser';
import express, {
  Express, Request, Response, NextFunction,
} from 'express';
import cors from 'cors';
import Controller from './interfaces/Controller';
import logger from './logger';
import { verifyCSRFToken } from './middleware/AuthMiddleware';

const cookieParser = require('cookie-parser');

function attachCsrfToken(url: string, cookie: string, value: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.url === url) {
      res.cookie(cookie, value, {
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
      });
    }
    next();
  };
}

class App {
  public app: Express;

  public server!: Server;

  public port: number;

  constructor(controllers: Array<Controller>, middleware: Array<Controller>, port: number) {
    this.app = express();
    this.port = port;

    this.initialize(controllers, middleware);
  }

  private initialize = async (controllers: Array<Controller>, middleware: Array<Controller>) => {
    this.initializeMiddleware(middleware);
    this.initializeControllers(controllers);
    this.initializePingEndpoint();
  };

  private initializeMiddleware = (middleware: Array<Controller>) => {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(cors(
      {
        origin: true,
        credentials: true,
      },
    ));

    // Attach CSRF token on each request.
    this.app.use(attachCsrfToken('/ping', 'csrfToken', (Math.random() * 100000000000000000).toString()));

    middleware.forEach((middlewareFn) => this.app.use(middlewareFn.router));
  };

  private initializeControllers = (controllers: Array<Controller>) => {
    controllers.forEach((controller) => {
      this.app.use('/', verifyCSRFToken, controller.router);
    });
  };

  private initializePingEndpoint = () => {
    this.app.use('/ping', (req, res) => {
      res.set('Cache-Control', 'no-store');
      res.send('Pong!');
    });
  }

  public listen() {
    import('http').then((http) => {
      this.server = http.createServer(this.app);
      this.server.listen(this.port, () => {
        logger.info(`Server started on port ${this.port}`);
      });
    });
  }
}
export default App;
