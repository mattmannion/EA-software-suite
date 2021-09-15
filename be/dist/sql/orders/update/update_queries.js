"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_completed = exports.update_assembled = exports.update_tack = exports.update_pallet = exports.update_notes = exports.update_item_query = exports.update_orders_query = void 0;
exports.update_orders_query = `
  update orders set
    product_name = $4,
    product_code = $5,
    order_options = $6,
    order_status = $7,
    order_option_ids = $8
  where id = $1 
  and order_id = $2 
  and order_detail_id = $3;
`;
exports.update_item_query = `
  update orders set product_name = $4, product_code = $5,
  order_status = $6, order_options = $7, order_option_ids = $8
    where 
    id = $1 
    and
    order_id = $2 
    and 
    order_detail_id = $3;
`;
exports.update_notes = `
  update orders set notes = $2
  where id = $1 
  returning *;
`;
exports.update_pallet = `
  update orders set pallet = $4
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning pallet;

`;
exports.update_tack = `
  update orders set tack = $4
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning tack;

`;
exports.update_assembled = `
  update orders set assembled = $4
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning assembled;

`;
exports.update_completed = `
  update orders set completed = $4
    where id = $1 
    and order_id = $2 
    and order_detail_id = $3
  returning completed;
`;
