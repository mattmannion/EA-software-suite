"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_order_by_row_id = exports.get_shipped_orders_query = exports.get_production_orders_query = exports.get_completed_orders_query = exports.get_all_orders_query = void 0;
exports.get_all_orders_query = `
select * from orders order by order_id asc
`;
exports.get_completed_orders_query = `
select * from orders
  where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%') 
  and
  completed != ''
  and 
  order_status != 'Shipped'
  and
  order_status != 'Cancelled' 
  and 
  order_status != 'Returned'
  order by id, order_id, order_detail_id;
`;
exports.get_production_orders_query = `
select id, order_date, order_id, full_name, order_options, 
product_name, product_code, order_status, 
completed, notes, pallet, tack, assembled, order_detail_id
  from orders
  where 
  order_status != 'Cancelled' 
  and
  order_status != 'Shipped'
  and 
  order_status != 'Returned'
  and
  order_status != 'Payment Declined'
  order by id, order_id, order_detail_id;
`;
exports.get_shipped_orders_query = `
select * from orders
  where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%') 
  and 
  order_status != 'Processing'
  and 
  order_status != 'New - See Order Notes'
  and 
  order_status != 'Partially Shipped'
  and
  order_status != 'Cancelled' 
  and 
  order_status != 'Returned'
  order by id,order_id, order_detail_id;
`;
exports.get_order_by_row_id = `
select id from orders where id = $1;
`;
