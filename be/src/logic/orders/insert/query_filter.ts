import { data_el_base, data_object, dod_el } from '../../../../types/logic/orders/insert/query_filter';

const clean = (data: string) =>
  data === null || data === undefined ? '' : data[0];



export default async function query_filter(data_array: data_object[])    {
  if (!Array.isArray(data_array)) return console.log('no data');

  // base query values
  let {
    OrderID,
    OrderDate,
    OrderStatus,
    BillingFirstName,
    BillingLastName,
    CustomerID,
    ShipPhoneNumber,
    ShipCountry,
    ShipState,
    ShipCity,
    ShipAddress1,
    ShipPostalCode,
    TrackingNumbers,
    PaymentAmount,
    PaymentMethodID,
  }: data_el_base = data_array[0];

  const full_name =
    BillingFirstName[0].trim() + ' ' + BillingLastName[0].trim();
  const notes = '';
  const pallet = '';
  const tack = '';
  const assembled = '';
  const completed = '';
  const order_date = OrderDate[0].split(' ')[0];
  let tracking = '';
  if (Array.isArray(TrackingNumbers)) {
    Object.entries(TrackingNumbers[0]).forEach(
      ([key, value]) => (tracking += `${key}:${value} `)
    );
  }

  const dod = data_array[0].OrderDetails;
  
  const query_filter = dod
    .map(
      ({
        OrderDetailID,
        OptionIDs,
        Options,
        ProductName,
        ProductCode,
        Quantity,
      }: dod_el) => {
        return {
          // id // 0
          order_id: clean(OrderID), // 1
          order_date, // 2
          order_status: clean(OrderStatus), // 3
          order_detail_id: clean(OrderDetailID), // 4
          order_options: clean(Options), // 5
          order_option_ids: clean(OptionIDs),
          cust_id: clean(CustomerID), // 8
          full_name, // 9
          phone_number: clean(ShipPhoneNumber), //10
          product_name: clean(ProductName), // 11
          product_code: clean(ProductCode), // 12
          product_qt: clean(Quantity), // 13
          notes, // 14
          pallet, // 15
          tack, // 16
          assembled, // 17
          completed, // 18
          ship_country: clean(ShipCountry), // 19
          ship_state: clean(ShipState), // 20
          ship_city: clean(ShipCity), // 21
          ship_address: clean(ShipAddress1), // 2
          ship_postal_code: clean(ShipPostalCode), // 23
          tracking, // 24
          payment_amount: clean(PaymentAmount), // 25
          payment_method_id: clean(PaymentMethodID), // 26
        };
      }
    )
    .filter(
      ({ product_code }:{product_code: string}) =>
        product_code.startsWith('EA') ||
        product_code.startsWith('ETA') ||
        product_code.startsWith('LS')
    );

  return query_filter;
}
