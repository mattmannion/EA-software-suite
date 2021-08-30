///////////////////
////// Types //////
///////////////////
export type d_u_ep_data = [
  {
    OrderStatus: string;
    OrderDetails: [];
  }
];

////////////////////
//// Interfaces ////
////////////////////
export interface query_element {
  id: number;
  order_id: string;
  order_detail_id: string;
}

export interface OrderDetails_elments {
  OrderDetailID: string;
  ProductName: string;
  ProductCode: string;
  Options: string;
  OptionIDs: string;
}
