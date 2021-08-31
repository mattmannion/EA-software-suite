"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_production_orders_query = exports.get_completed_orders_query = void 0;
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
  order by order_id, order_detail_id;
`;
exports.get_production_orders_query = `
select id, order_date, order_id, full_name, order_options, 
product_name, product_code, order_status, 
completed, notes, pallet, tack, assembled, order_detail_id
  from orders
  where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%') 
  and
  order_status != 'Cancelled' 
  and 
  order_status != 'Shipped'
  and 
  order_status != 'Returned'
  order by order_id, order_detail_id;
`;
