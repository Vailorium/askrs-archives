import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { Auth } from 'firebase-admin/lib/auth/auth';
import CustomDecodedIdToken from '../interfaces/CustomDecodedIdToken';

console.log(process.env);
const serviceAccount: admin.ServiceAccount = {
  // type: process.env.FIREBASE_ADMIN_TYPE,
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  // private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/gm, '\n') : undefined,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  // client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  // auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  // token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  // auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  // client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

class FirebaseService {
  private app: App;

  public auth: Auth;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.auth = admin.auth(this.app);
  }

  async getUserClaimsFromSession(sessionCookie: string): Promise<CustomDecodedIdToken> {
    return new Promise((resolve, reject) => {
      this.auth
        .verifySessionCookie(sessionCookie, true)
        .then((decodedClaims) => resolve(decodedClaims as CustomDecodedIdToken))
        .catch(() => reject());
    });
  }
}
export default new FirebaseService();
