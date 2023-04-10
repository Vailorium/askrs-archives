/* eslint-disable class-methods-use-this */
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  inMemoryPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import api from '../api/api';

const firebaseConfig = {
  apiKey: 'AIzaSyD1Xl3mapVQ1V8KBTZlwRwfaUcBWvIFTvg',
  authDomain: 'askrs-archives-staging.firebaseapp.com',
  projectId: 'askrs-archives-staging',
  storageBucket: 'askrs-archives-staging.appspot.com',
  messagingSenderId: '1015027298323',
  appId: '1:1015027298323:web:065c1a89828a5412cc8fe6',
};

interface LoginMessage {
  success: boolean;
  message: string;
}

class AuthService {
  private app: FirebaseApp;

  private auth: Auth;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);

    this.auth.setPersistence(inMemoryPersistence);
  }

  public async signIn(email: string, password: string): Promise<LoginMessage> {
    return new Promise(
      (resolve) => signInWithEmailAndPassword(this.auth, email, password)
        .then(async (credentials) => credentials.user.getIdToken()
          .then(async (idToken) => {
            const result = await api.setupUserSession(idToken);
            if (result.status === 'success') {
              resolve({
                success: true,
                message: 'Success',
              });
              return;
            }
            resolve({
              success: false,
              message: result.status,
            });
          })
          .then(() => this.auth.signOut())
          .catch((error: AuthError) => {
            resolve({
              success: false,
              message: error.message,
            });
          })),
    );
  }

  public async registerUser(email: string, password: string): Promise<LoginMessage> {
    return new Promise(
      (resolve) => createUserWithEmailAndPassword(this.auth, email, password)
        .then(async (credentials) => credentials.user.getIdToken()
          .then(async (idToken) => {
            await api.handlePostRegister(idToken);
            const result = await api.setupUserSession(idToken);
            // TODO: email validation
            if (result.status === 'success') {
              resolve({
                success: true,
                message: 'Success',
              });
              return;
            }
            resolve({
              success: false,
              message: result.status,
            });
          })
          .then(() => this.auth.signOut())
          .catch((error: AuthError) => {
            resolve({
              success: false,
              message: error.message,
            });
          })),
    );
  }

  public async signOut() {
    await api.destroyUserSession();
  }
}
export default new AuthService();
