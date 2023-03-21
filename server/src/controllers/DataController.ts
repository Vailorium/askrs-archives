import etag from 'etag';
import { Request, Response, Router } from 'express';

import FEHData from '../data/FEHData';
import LocaleData from '../data/LocaleData';
import Controller from '../interfaces/Controller';
import Dictionary from '../interfaces/Dictionary';
import { HeroDataModel } from '../models/hero';
import { SkillDataModel } from '../models/skill';

class GameDataController implements Controller {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/data', this.getGameData);
    this.router.get('/locale/:locale', this.getLocaleData);
  }

  // eslint-disable-next-line max-len
  private getGameData = async (req: Request, res: Response<{ heroList: HeroDataModel[], skillList: SkillDataModel[], resplendentList: string[], sealList: string[] }>) => {
    res.setHeader('Cache-Control', 'no-cache, max-age=2628000');
    const body = {
      heroList: FEHData.heroList,
      skillList: FEHData.skillList,
      resplendentList: FEHData.resplendentList,
      sealList: FEHData.sealList,
    };

    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch) {
      const eTag = etag(JSON.stringify(body), { weak: true });
      if (ifNoneMatch === eTag) {
        res.status(304).end();
      }
    } else {
      res.status(200).json(body).end();
    }
  }

  // eslint-disable-next-line max-len
  private getLocaleData = async (req: Request<{ locale: string }>, res: Response<Dictionary<string | null>>) => {
    res.setHeader('Cache-Control', 'no-cache, max-age=2628000');
    const { locale } = req.params;

    if (Object.keys(LocaleData).includes(locale)) {
      const body = LocaleData[locale];
      const ifNoneMatch = req.headers['if-none-match'];
      if (ifNoneMatch) {
        const eTag = etag(JSON.stringify(body), { weak: true });
        if (ifNoneMatch === eTag) {
          res.status(304).end();
        }
      } else {
        res.status(200).json(body).end();
      }
    } else {
      res.status(404).end();
    }
  }
}
export default GameDataController;
