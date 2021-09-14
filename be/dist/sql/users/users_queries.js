"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_one_user_query = exports.get_one_user_query = exports.get_all_users_query = exports.delete_one_user_query = exports.create_one_user_query = void 0;
exports.create_one_user_query = `
  insert into users 
   (first_name, 
    last_name, 
    email, 
    password, 
    username, 
    permissions, 
    confirmed)
    values 
    ($1, $2, $3, 
     $4, $5, $6, $7)
  returning first_name, last_name, email, permissions;
`;
exports.delete_one_user_query = `
  delete from users 
    where id = $1
  returning username;
`;
exports.get_all_users_query = `
  select 
    id, 
    first_name, 
    last_name,
    email,
    username,
    permissions
  from users order by id
`;
exports.get_one_user_query = `
  select 
    id, 
    first_name, 
    last_name,
    email,
    username,
    permissions
  from users where id = $1
`;
exports.update_one_user_query = `
  select * from users where id = $1
`;
