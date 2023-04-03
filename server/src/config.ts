/* eslint-disable import/prefer-default-export */
enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

enum PermissionLevel {
  NONE = 0,
  DEFAULT_USER = 1,
  ADMIN = 9,
}

export {
  Role,
  PermissionLevel,
};
