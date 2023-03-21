import { Request, Response, Router } from 'express';
import { Chance } from 'chance';
import FEHData from '../data/FEHData';
import Controller from '../interfaces/Controller';

class HomeController implements Controller {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/home', this.getHomepageData);
  }

  // eslint-disable-next-line max-len
  private getHomepageData = async (req: Request, res: Response<{ heroID: number }>) => {
    const daysSinceEpoch = Math.floor(Date.now() / 8.64e7);
    const seededRNG = new Chance(daysSinceEpoch);
    const heroID = Math.abs(seededRNG.integer()) % FEHData.heroList.length;

    res.status(200).send({ heroID });
  };
}
export default HomeController;
