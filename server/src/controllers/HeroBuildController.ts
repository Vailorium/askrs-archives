/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import Controller from '../interfaces/Controller';
import IHeroBuild from '../interfaces/IHeroBuild';
import logger from '../logger';
import { verifySessionCookie } from '../middleware/AuthMiddleware';
import CustomDecodedIdToken from '../interfaces/CustomDecodedIdToken';
import {
  createHeroBuild,
  deleteHeroBuild,
  getHeroBuildByBuildId,
  getHeroBuildsByHeroIdTag,
  getHeroBuildsByUid,
  updateHeroBuild,
} from '../models/HeroBuildModel';
import heroBuildSchema from '../lib/HeroBuildSchema';
import { validateBody } from '../middleware/ValidationMiddleware';

class HeroBuildController implements Controller {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/builds', verifySessionCookie, this.getMyBuilds);
    this.router.get('/builds/by-id-tag/:heroIdTag', this.getAllBuildsForHero);
    this.router.get('/builds/by-uid/:uid', this.getAllBuildsForUser);
    this.router.get('/build/:buildId', this.getBuildByBuildId);
    this.router.post('/build', verifySessionCookie, validateBody(heroBuildSchema), this.createBuild);
    this.router.put('/build/:buildId', verifySessionCookie, validateBody(heroBuildSchema), this.updateBuild);
    this.router.delete('/build/:buildId', verifySessionCookie, this.deleteBuild);
  }

  private getMyBuilds = async (req: Request, res: Response<IHeroBuild[]>) => {
    const { uid } = req.user as CustomDecodedIdToken;
    const builds = await getHeroBuildsByUid(uid);
    res.status(200).send(builds);
  }

  private getAllBuildsForHero = async (req: Request<{ heroIdTag: string }>, res: Response<IHeroBuild[]>) => {
    const { heroIdTag } = req.params;
    const builds = await getHeroBuildsByHeroIdTag(heroIdTag);
    res.status(200).send(builds);
  };

  private getAllBuildsForUser = async (req: Request<{ uid: string }>, res: Response<IHeroBuild[]>) => {
    const { uid } = req.params;
    const builds = await getHeroBuildsByUid(uid);
    res.status(200).send(builds);
  };

  private getBuildByBuildId = async (req: Request<{ buildId: string }>, res: Response<IHeroBuild | null>) => {
    const { buildId } = req.params;
    getHeroBuildByBuildId(buildId)
      .then((build) => {
        res.status(200).send(build);
      })
      .catch(() => {
        res.status(404).send();
      });
  };

  private createBuild = async (req: Request<{}, {}, IHeroBuild>, res: Response<IHeroBuild>) => {
    const { uid } = req.user as CustomDecodedIdToken;
    const buildData: IHeroBuild = { ...req.body, uid };
    createHeroBuild(buildData)
      .then((build) => {
        res.status(201).send(build);
      })
      .catch((error) => {
        logger.error(`Failed to create a build for user ${uid}: ${error}`);
        res.status(500).send();
      });
  };

  private updateBuild = async (req: Request<{ buildId: string }, {}, IHeroBuild>, res: Response<IHeroBuild | null>) => {
    const { uid } = req.user as CustomDecodedIdToken;
    const { buildId } = req.params;

    getHeroBuildByBuildId(buildId)
      .then((build) => {
        // if user is the person who created the build
        if (build.uid === uid) {
          const buildData = req.body;
          updateHeroBuild(buildId, buildData)
            .then((result) => {
              res.status(200).send(result as IHeroBuild);
            })
            .catch((err) => {
              logger.error(`Failed to update build for ${uid}, build id ${buildId}, build exists. Error: ${JSON.stringify(err)}`);
              res.status(500).send();
            });
        }
      })
      .catch(() => {
        res.status(404).send();
      });
  };

  private deleteBuild = async (req: Request<{ buildId: string }>, res: Response) => {
    const { uid } = req.user as CustomDecodedIdToken;
    const { buildId } = req.params;

    getHeroBuildByBuildId(buildId)
      .then((build) => {
        if (build.uid === uid) {
          deleteHeroBuild(buildId)
            .then((success) => {
              if (success) {
                res.status(200).send();
              } else {
                res.status(500).send();
              }
            });
        }
      })
      .catch(() => res.status(404).send());
  };
}

export default HeroBuildController;
