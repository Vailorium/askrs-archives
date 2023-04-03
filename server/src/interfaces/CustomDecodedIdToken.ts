import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { PermissionLevel, Role } from '../config';

interface CustomDecodedIdToken extends DecodedIdToken {
  role?: Role;
  permissionLevel?: PermissionLevel;
}
export default CustomDecodedIdToken;
