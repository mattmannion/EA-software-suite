export const create_one_user_query = `
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

export const delete_one_user_query = `
  delete from users 
    where id = $1
  returning username;
`;

export const get_all_users_query = `
  select 
    id, 
    first_name, 
    last_name,
    email,
    username,
    permissions
  from users order by id
`;

export const get_one_user_query = `
  select 
    id, 
    first_name, 
    last_name,
    email,
    username,
    permissions
  from users where id = $1
`;

export const update_one_user_query = `
  select * from users where id = $1
`;
