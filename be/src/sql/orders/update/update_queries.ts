export const update_orders_query = `
  update orders set
    product_name = $4,
    product_code = $5,
    order_options = $6,
    order_status = $7
  where id = $1 
  and order_id = $2 
  and order_detail_id = $3;
`;

export const update_item_query = `
  update orders set product_name = $4, product_code = $5,
  order_status = $6, order_options = $7, order_option_ids = $8
    where id = $1 
    and
    order_id = $2 
    and 
    order_detail_id = $3
  returning *;
`;

export const update_notes = `
  update orders set notes = $4
  where id = $1 
  and order_id = $2 
  and order_detail_id = $3
  returning *;
`;

export const update_pallet = `
  update orders set pallet = $4
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning pallet;

`;
export const update_tack = `
  update orders set tack = $4
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning tack;

`;
export const update_assembled = `
  update orders set assembled = $4
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning assembled;

`;
export const update_completed = `
  update orders set completed = $3
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning completed;
`;
