import { Role } from '../../config';

interface IDBUserInfo {
  username: string;
  uid: string;
}

interface IUserInfo extends IDBUserInfo {
  role: Role;
}

export type {
  IDBUserInfo,
};
export default IUserInfo;
