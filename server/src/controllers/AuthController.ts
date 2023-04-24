import {
  CookieOptions, Request, Response, Router,
} from 'express';
import { PermissionLevel, Role } from '../config';
import { createUserProfile, getUserProfileByUid, getUserProfileByUsername } from '../models/UserProfileModel';
import Controller from '../interfaces/Controller';
import logger from '../logger';
import FirebaseService from '../services/FirebaseService';
import { validateBody } from '../middleware/ValidationMiddleware';
import postRegisterSchema from '../lib/PostRegisterSchema';
import IHeroBuild from '../interfaces/db/IDBHeroBuild';
import { getHeroBuildsByUid } from '../models/HeroBuildModel';
import IUserInfo from '../interfaces/profile/IUserInfo';

class AuthController implements Controller {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', validateBody(postRegisterSchema), this.handlePostRegister);
    this.router.post('/session', this.setupUserSession);
    this.router.delete('/session', this.destroyUserSession);
    this.router.delete('/sessions', this.destroyAllUserSessions);
    this.router.get('/profile', this.getUserProfile);
    this.router.get('/profile/by-uid/:uid', this.getUserProfileByUid);
    this.router.get('/profile/by-username/:username', this.getUserProfileByUsername);
    this.router.get('/profile/:search', this.searchForUserProfile);
  }

  private setupUserSession = async (req: Request<{}, {}, { idToken: string }>, res: Response) => {
    const { idToken } = req.body;

    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 5 day expiry
    FirebaseService.auth
      .verifyIdToken(idToken)
      .then((decodedIdToken) => {
        // only process token if user logged in the last 5 minutes - guards against token theft
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          FirebaseService.auth
            .createSessionCookie(idToken, { expiresIn })
            .then((sessionCookie) => {
              const options: CookieOptions = {
                maxAge: expiresIn,
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'lax',
              };
              res.status(200).cookie('session', sessionCookie, options).send({ status: 'success' });
            }, (error) => {
              logger.info(error);
              res.status(401).send();
            });
          return;
        }
        res.status(401).send('Recent sign in required!');
      });
  }

  private destroyUserSession = async (req: Request, res: Response) => {
    res.clearCookie('session');
    res.status(200).send();
  }

  private destroyAllUserSessions = async (req: Request, res: Response) => {
    const sessionCookie = req.cookies.session || '';
    res.clearCookie('session');

    FirebaseService.getUserClaimsFromSession(sessionCookie)
      .then((claims) => {
        FirebaseService.auth
          .revokeRefreshTokens(claims.sub)
          .then(() => res.status(200).send())
          .catch((error) => {
            logger.error(error);
            res.status(500).send();
          });
      })
      .catch((error) => {
        logger.error(error);
        res.status(400).send();
      });
  }

  private handlePostRegister = (
    req: Request<{}, {}, { username: string, idToken: string }>, res: Response,
  ) => {
    const { username, idToken } = req.body;
    FirebaseService.auth
      .verifyIdToken(idToken)
      .then(async (decodedIdToken) => {
        const { uid } = decodedIdToken;
        createUserProfile({
          uid,
          username,
          socials: {},
          favoriteHeroes: [],
          favoriteARD: [],
          favoriteARO: [],
        })
          .then(() => {
            FirebaseService.auth.setCustomUserClaims(
              uid,
              { role: Role.USER, permissionLevel: PermissionLevel.DEFAULT_USER },
            ).then(() => {
              res.status(200).send();
            }).catch((error) => {
              logger.error('Error assigning user permissions: ', error);
              res.status(500).send();
            });
          })
          .catch((error) => {
            logger.warn('Error assigning user display name: ', error);
            res.status(500).send();
          });
      })
      .catch((error) => {
        logger.warn('Error assigning user permissions/display name: ', error);
        res.status(401).send();
      });
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
              role,
            });
          })
          .catch(() => {
            logger.error(`User ${uid} is missing a user profile on the DB`);
            res.status(200).send({
              username: '',
              role: Role.USER,
            });
          });
      })
      .catch(() => {
        res.status(200).send({
          username: '',
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
    // const dbProfile = await getUs
    // erProfileByUid(search) || await getUserProfileByUsername(search);

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
}
export default AuthController;
