export const select_filtered_orders = `
  select id, order_id, order_detail_id from orders 
    where
    order_status != 'Cancelled' 
    and 
    order_status != 'Shipped'
    and 
    order_status != 'Returned'
  order by id, order_id, order_detail_id;
`;
