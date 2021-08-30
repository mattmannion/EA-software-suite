"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clean = data => (data === null || data === undefined ? '' : data[0]);
function query_filter(data_array) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(data_array))
            return console.log('no data');
        let { OrderID, OrderDate, OrderStatus, BillingFirstName, BillingLastName, CustomerID, ShipPhoneNumber, ShipCountry, ShipState, ShipCity, ShipAddress1, ShipPostalCode, TrackingNumbers, PaymentAmount, PaymentMethodID, } = data_array[0];
        const full_name = BillingFirstName[0].trim() + ' ' + BillingLastName[0].trim();
        const notes = '';
        const pallet = '';
        const tack = '';
        const assembled = '';
        const completed = '';
        const order_date = OrderDate[0].split(' ')[0];
        let tracking = '';
        if (Array.isArray(TrackingNumbers)) {
            Object.entries(TrackingNumbers[0]).forEach(([key, value]) => (tracking += `${key}:${value} `));
        }
        const dod = data_array[0].OrderDetails;
        const query_filter = dod
            .map(({ OrderDetailID, OptionIDs, Options, ProductName, ProductCode, Quantity, }) => {
            return {
                order_id: clean(OrderID),
                order_date,
                order_status: clean(OrderStatus),
                order_detail_id: clean(OrderDetailID),
                order_options: clean(Options),
                order_option_ids: clean(OptionIDs),
                cust_id: clean(CustomerID),
                full_name,
                phone_number: clean(ShipPhoneNumber),
                product_name: clean(ProductName),
                product_code: clean(ProductCode),
                product_qt: clean(Quantity),
                notes,
                pallet,
                tack,
                assembled,
                completed,
                ship_country: clean(ShipCountry),
                ship_state: clean(ShipState),
                ship_city: clean(ShipCity),
                ship_address: clean(ShipAddress1),
                ship_postal_code: clean(ShipPostalCode),
                tracking,
                payment_amount: clean(PaymentAmount),
                payment_method_id: clean(PaymentMethodID),
            };
        })
            .filter(({ product_code }) => product_code.startsWith('EA') ||
            product_code.startsWith('ETA') ||
            product_code.startsWith('LS'));
        return query_filter;
    });
}
exports.default = query_filter;
