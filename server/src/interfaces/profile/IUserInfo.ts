import { Role } from '../../config';

interface IDBUserInfo {
  username: string;
}

interface IUserInfo extends IDBUserInfo {
  role: Role;
}

export type {
  IDBUserInfo,
};
export default IUserInfo;
