///////////////////
////// Types //////
///////////////////
export type data_el_base = {
  OrderID:string,
  OrderDate:string,
  OrderStatus:string,
  BillingFirstName:string,
  BillingLastName:string,
  CustomerID:string,
  ShipPhoneNumber:string,
  ShipCountry:string,
  ShipState:string,
  ShipCity:string,
  ShipAddress1:string,
  ShipPostalCode:string,
  TrackingNumbers:string,
  PaymentAmount:string,
  PaymentMethodID:string,
};

export type data_object = {
OrderID:string,
OrderDate:string,
OrderStatus:string,
BillingFirstName:string,
BillingLastName:string,
CustomerID:string,
ShipPhoneNumber:string,
ShipCountry:string,
ShipState:string,
ShipCity:string,
ShipAddress1:string,
ShipPostalCode:string,
TrackingNumbers:string,
PaymentAmount:string,
PaymentMethodID:string,
OrderDetails: []
}

////////////////////
//// Interfaces ////
////////////////////

export interface dod_el {
  OrderDetailID: string;
  OptionIDs: string;
  Options: string;
  ProductName: string;
  ProductCode: string;
  Quantity: string;
}
