"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select_filtered_orders = void 0;
exports.select_filtered_orders = `
  select id, order_id, order_detail_id from orders 
    where
    order_status != 'Cancelled' 
    and 
    order_status != 'Shipped'
    and 
    order_status != 'Returned'
  order by id, order_id, order_detail_id;
`;
