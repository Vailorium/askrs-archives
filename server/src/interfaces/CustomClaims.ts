import { PermissionLevel, Role } from '../config';

interface CustomClaims {
  role?: Role;
  permissionLevel?: PermissionLevel;
}
export default CustomClaims;
