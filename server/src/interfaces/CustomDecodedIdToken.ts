import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import CustomClaims from './CustomClaims';

interface CustomDecodedIdToken extends DecodedIdToken, CustomClaims {

}
export default CustomDecodedIdToken;
