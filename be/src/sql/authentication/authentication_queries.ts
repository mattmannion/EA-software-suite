export const login_query = `
  select username, permissions, password from users 
  where username=$1 
`;
