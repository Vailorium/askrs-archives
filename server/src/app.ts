import { Server } from 'http';
import * as bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';

const cookieParser = require('cookie-parser');

class App {
  public app: Express;

  public server!: Server;

  public port: number;

  constructor(controllers: Array<any>, port: number) {
    this.app = express();
    this.port = port;

    this.initialize(controllers);
  }

  private initialize = async (controllers: Array<any>) => {
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeStaticRouting();
  };

  private initializeMiddleware = () => {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  };

  private initializeControllers = (controllers: Array<any>) => {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
    });
  };

  private initializeStaticRouting = () => {
    this.app.use(express.static(path.join(__dirname, '../../client', 'build')));
    this.app.use(express.static('public'));
    this.app.use((req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client', 'build', 'index.html'));
    });
  };

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
