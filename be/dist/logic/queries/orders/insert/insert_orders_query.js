"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_orders_query = exports.find_last_order_query = void 0;
exports.find_last_order_query = `
  select order_id from orders
  order by order_id desc limit 1;
`;
exports.insert_orders_query = `
  insert into orders (
    order_id,
    order_date,
    order_status,
    order_detail_id,
    order_option,
    order_option_id,
    full_name,
    shipped,
    product_name,
    product_code,
    notes,
    pallet,
    tack,
    assembled,
    completed,
    last_mod
    )
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
  returning *;
`;
