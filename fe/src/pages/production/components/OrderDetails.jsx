import React from 'react';

// Removes XML from some entries
const RemoveXML = ProductName =>
  ProductName.includes('>') ? ProductName.split('>')[1] : ProductName;

export default function OrderDetails({ getVolData }) {
  return (
    <tbody>
      {getVolData.map((data, index) => {
        // stores table info for further mapping if needed
        const {
          OrderID,
          OrderDate,
          BillingFirstName,
          BillingLastName,
          OrderDetails,
        } = data;

        // removes the time of day the order was placed leaving only the date
        const OrderDate_No_Time = OrderDate.split(' ')[0];

        return (
          <React.Fragment key={index}>
            {!Array.isArray(OrderDetails) ? (
              <tr>
                <th>{OrderDate_No_Time}</th>
                <td>{OrderID}</td>
                <td>
                  {BillingFirstName} {BillingLastName}
                </td>
                <td>
                  {RemoveXML(OrderDetails.ProductName)} (
                  {OrderDetails.ProductCode})
                </td>
              </tr>
            ) : (
              <React.Fragment key={OrderID}>
                {OrderDetails.map(
                  ({ OrderDetailID, ProductName, ProductCode }) => (
                    <tr key={OrderDetailID}>
                      <th>{OrderDate_No_Time}</th>
                      <td>{OrderID}</td>
                      <td>
                        {BillingFirstName} {BillingLastName}
                      </td>
                      <td>
                        {RemoveXML(ProductName)} ({ProductCode})
                      </td>
                    </tr>
                  )
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
}
