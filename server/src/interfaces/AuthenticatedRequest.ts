import CustomDecodedIdToken from './CustomDecodedIdToken';

declare global {
  namespace Express {
    interface Request {
      user?: CustomDecodedIdToken;
    }
  }
}
