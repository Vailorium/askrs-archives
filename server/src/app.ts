import { Server } from 'http';
import * as bodyParser from 'body-parser';
import express, { Express } from 'express';
import cors from 'cors';
import Controller from './interfaces/Controller';

const cookieParser = require('cookie-parser');

class App {
  public app: Express;

  public server!: Server;

  public port: number;

  constructor(controllers: Array<Controller>, port: number) {
    this.app = express();
    this.port = port;

    this.initialize(controllers);
  }

  private initialize = async (controllers: Array<Controller>) => {
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializePingEndpoint();
  };

  private initializeMiddleware = () => {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  };

  private initializeControllers = (controllers: Array<Controller>) => {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
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
        console.log(`Server started on port ${this.port}`);
      });
    });
  }
}
export default App;
