import React, { useEffect } from 'react';
import { useState } from 'react';
import { api_path } from '../../axios/axios_properties';
import OrderDetails from './components/OrderDetails';

function ProductionHome() {
  const [getVolData, setVolData] = useState([]);

  const volusionFetch = async () => {
    let response = await fetch(`${api_path}/volusion`, {
      method: 'get',
      headers: {
        origin: process.env.REACT_APP_LOCATION,
      },
    });

    if (!response) return console.log('no response...');

    // transform response to text stored as json
    const json = await response.text();

    const { data } = JSON.parse(json);
    setVolData(() => data.map(m => m));

    return json;
  };

  useEffect(
    () => volusionFetch(),
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <strong>Production</strong>
      <div className='m-5'>
        <table className='table table-striped table-dark table-hover '>
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product Name (Product Code)</th>
            </tr>
          </thead>
          <OrderDetails getVolData={getVolData} />
        </table>
      </div>
    </>
  );
}

export default ProductionHome;
