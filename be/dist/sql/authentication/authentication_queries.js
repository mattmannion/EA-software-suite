"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_query = void 0;
exports.login_query = `
  select username, permissions from users 
  where username=$1 
  and password=$2;
`;
