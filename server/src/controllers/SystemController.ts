import { Request, Response, Router } from 'express';
import Controller from '../interfaces/Controller';

class SystemController implements Controller {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/ping', this.ping);
  }

  // eslint-disable-next-line max-len
  private ping = async (req: Request, res: Response<string>) => {
    res.status(200).send('Pong!');
  };
}
export default SystemController;
