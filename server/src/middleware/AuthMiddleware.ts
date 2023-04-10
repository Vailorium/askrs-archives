/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import FirebaseService from '../services/FirebaseService';
// import AuthenticatedRequest from '../interfaces/AuthenticatedRequest';

async function verifyCSRFToken(req: Request, res: Response, next: NextFunction) {
  const headerToken = req.headers['x-csrf-token'];
  const cookieToken = req.cookies.csrfToken;

  if (headerToken !== cookieToken) {
    logger.warn(`Potential CSRF attack, IP: ${req.ip}`);
    res.status(401).send();
    return;
  }

  next();
}

async function verifySessionCookie(req: Request, res: Response, next: NextFunction) {
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    res.status(401).send();
  }

  FirebaseService.getUserClaimsFromSession(sessionCookie)
    .then((claims) => {
      req.user = claims;
      next();
    })
    .catch(() => res.status(401).send());
}

export {
  verifyCSRFToken,
  verifySessionCookie,
};
