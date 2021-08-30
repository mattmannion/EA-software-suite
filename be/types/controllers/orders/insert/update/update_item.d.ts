///////////////////
////// Types //////
///////////////////
export type OrderDetails_el_filter = {
  order_id: string;
  order_detail_id: string;
};

////////////////////
//// Interfaces ////
////////////////////

export interface OrderDetails_el_upd {
  OrderDetailID: string;
  ProductName: string;
  ProductCode: string;
  OrderStatus: string;
  Options: string;
  OptionIDs: string;
}
