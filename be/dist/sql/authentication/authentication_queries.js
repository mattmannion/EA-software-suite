"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_query = void 0;
exports.login_query = `
  select username, permissions, password from users 
  where username=$1 
`;
