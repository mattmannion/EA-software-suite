export const login_query = `
  select username, permissions from users 
  where username=$1 
  and password=$2;
`;
