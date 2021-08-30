export const update_orders_query = `
  update orders set
    product_name = $4,
    product_code = $5,
    order_option = $6,
    order_status = $7
  where id = $1 
  and order_id = $2 
  and order_detail_id = $3;
`;

export const update_item_query = `
  update orders set product_name = $4, product_code = $5,
  order_status = $6, order_option = $7, order_option_id = $8
    where id = $1 
    and
    order_id = $2 
    and order_detail_id = $2
  returning *;
`;

export const update_notes = `
  update orders set notes = $4
  where id = $1 
  and order_id = $2 
  and order_detail_id = $3
  returning *;
`;
