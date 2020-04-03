const ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest"
};

const isRole = {
  [ROLES.ADMIN]: user => user.isAdmin,
  [ROLES.USER]: user => user.isAuthenticated && !user.isAdmin,
  [ROLES.GUEST]: user => !user.isAuthenticated
};

export const isAuthorized = ({ user, roles }) =>
  roles.some(role => isRole[role](user));

export default ROLES;
