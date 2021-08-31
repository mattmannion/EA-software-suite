export const insert_new_db_query = `
  insert into orders (
    order_id,
    order_date,
    order_status,
    order_detail_id,
    order_options,
    order_option_ids,
    cust_id,
    full_name,
    phone_number,
    product_name,
    product_code,
    product_qt,
    notes,
    pallet,
    tack,
    assembled,
    completed,
    ship_country,
    ship_state,
    ship_city,
    ship_address,
    ship_postal_code,
    tracking,
    payment_amount,
    payment_method_id
    )
  values (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    $11, $12, $13, $14, $15, $16, $17, $18,
    $19, $20, $21, $22, $23, $24, $25
  )
`;

export const find_last_order_query = `
  select order_id from orders
  order by order_id desc limit 1;
`;

export const insert_orders_query = `
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
