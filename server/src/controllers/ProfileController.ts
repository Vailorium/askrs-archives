import {
  Request, Response, Router,
} from 'express';
import { Role } from '../config';
import { getUserProfileByUid, getUserProfileByUsername, updateUserProfile } from '../models/UserProfileModel';
import Controller from '../interfaces/Controller';
import logger from '../logger';
import FirebaseService from '../services/FirebaseService';
import { validateBody } from '../middleware/ValidationMiddleware';
import IHeroBuild from '../interfaces/db/IDBHeroBuild';
import { getHeroBuildsByUid } from '../models/HeroBuildModel';
import IUserInfo from '../interfaces/profile/IUserInfo';
import userProfileSchema from '../lib/UserProfileSchema';
import IUserProfile from '../interfaces/profile/IUserProfile';
import CustomDecodedIdToken from '../interfaces/CustomDecodedIdToken';
import { verifySessionCookie } from '../middleware/AuthMiddleware';

class ProfileController implements Controller {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/profile', this.getUserProfile);
    this.router.get('/profile/by-uid/:uid', this.getUserProfileByUid);
    this.router.get('/profile/by-username/:username', this.getUserProfileByUsername);
    this.router.get('/profile/:search', this.searchForUserProfile);
    this.router.put('/profile', verifySessionCookie, validateBody(userProfileSchema, true), this.putUserProfile);
  }

  private getUserProfile = async (req: Request, res: Response<IUserInfo>) => {
    // get user details from cookie
    const sessionCookie = req.cookies.session;
    FirebaseService.getUserClaimsFromSession(sessionCookie)
      .then((decodedClaims) => {
        const { uid } = decodedClaims;
        let role = Role.USER;
        if (decodedClaims.role) {
          role = decodedClaims.role;
        }
        getUserProfileByUid(uid)
          .then((userProfile) => {
            res.status(200).send({
              username: userProfile.username,
              uid,
              role,
            });
          })
          .catch(() => {
            logger.error(`User ${uid} is missing a user profile on the DB`);
            res.status(200).send({
              username: '',
              uid: '',
              role: Role.USER,
            });
          });
      })
      .catch(() => {
        res.status(200).send({
          username: '',
          uid: '',
          role: Role.USER,
        });
      });
  }

  private getUserProfileByUid = async (
    req: Request<{ uid: string }>,
    res: Response<{
      profile: IUserInfo;
      builds: IHeroBuild[]
    }>,
  ) => {
    const currentUid = req.user ? req.user.uid : undefined;
    const { uid } = req.params;
    const isViewingOwnProfile = !!currentUid && uid === currentUid;

    const dbProfile = await getUserProfileByUid(uid);
    const customClaims = await FirebaseService.getUserCustomClaimsByUid(uid);

    if (!dbProfile) {
      res.status(404).send();
      return;
    }

    if (!customClaims.role) {
      customClaims.role = Role.USER;
    }

    const profile = {
      ...dbProfile,
      role: customClaims.role,
    };
    const builds = await getHeroBuildsByUid(uid, isViewingOwnProfile);

    res.status(200).send({
      profile,
      builds,
    });
  }

  private getUserProfileByUsername = async (
    req: Request<{ username: string }>,
    res: Response<{
      profile: IUserInfo;
      builds: IHeroBuild[]
    }>,
  ) => {
    const currentUid = req.user ? req.user.uid : undefined;
    const { username } = req.params;

    const dbProfile = await getUserProfileByUsername(username);
    if (!dbProfile) {
      res.status(404).send();
      return;
    }
    const { uid } = dbProfile;
    const isViewingOwnProfile = !!currentUid && uid === currentUid;

    const customClaims = await FirebaseService.getUserCustomClaimsByUid(uid);
    if (!customClaims.role) {
      customClaims.role = Role.USER;
    }

    const profile = {
      ...dbProfile,
      role: customClaims.role,
    };
    const builds = await getHeroBuildsByUid(uid, isViewingOwnProfile);

    res.status(200).send({
      profile,
      builds,
    });
  }

  private searchForUserProfile = async (
    req: Request<{ search: string }>,
    res: Response<{
      profile: IUserInfo;
      builds: IHeroBuild[]
    }>,
  ) => {
    const currentUid = req.user ? req.user.uid : undefined;
    const { search } = req.params;

    let dbProfile;
    try {
      dbProfile = await getUserProfileByUid(search);
    } catch (e) {
      try {
        dbProfile = await getUserProfileByUsername(search);
      } catch (er) {
        res.status(404).send();
        return;
      }
    }

    if (!dbProfile) {
      res.status(404).send();
      return;
    }
    const { uid } = dbProfile;
    const isViewingOwnProfile = !!currentUid && uid === currentUid;

    const customClaims = await FirebaseService.getUserCustomClaimsByUid(uid);
    if (!customClaims.role) {
      customClaims.role = Role.USER;
    }

    const profile = {
      ...dbProfile,
      role: customClaims.role,
    };
    const builds = await getHeroBuildsByUid(uid, isViewingOwnProfile);

    res.status(200).send({
      profile,
      builds,
    });
  }

  private putUserProfile = async (
    req: Request<{}, {}, IUserProfile>,
    res: Response,
  ) => {
    // TODO: update schema for role (transform?)
    const { uid } = req.user as CustomDecodedIdToken;
    const userProfile = { ...req.body, uid };

    updateUserProfile(uid, userProfile)
      .then((prof) => res.status(200).send(prof))
      .catch((err) => {
        logger.warn(`Error updating user profile ${err}`);
        res.status(400).send();
      });
  }
}
export default ProfileController;
