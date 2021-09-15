export const delete_order_query = `
  delete from orders where id = $1;
`;
