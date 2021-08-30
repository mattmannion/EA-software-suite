export const select_filtered_orders = `
  select id, order_id, order_detail_id from orders 
  where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%' ) 
    and
    order_status != 'Cancelled' 
    and 
    order_status != 'Shipped'
    and 
    order_status != 'Returned'
  group by id, order_id, order_detail_id
  order by id,order_id, order_detail_id;
`;
