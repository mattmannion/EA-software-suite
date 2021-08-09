import './production_tabs.css';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function ProductionTabs() {
  const { path } = useRouteMatch();
  return (
    <>
      <div className='production-tab-spacer'>&nbsp;</div>
      <div className='d-flex justify-content-center align-items-center production-tabs'>
        {path !== '/production' ? (
          <Link to='/production' className='btn btn-primary btn-lg m-1'>
            Production
          </Link>
        ) : (
          <></>
        )}
        {path !== '/production/completed' ? (
          <Link
            to='/production/completed'
            className='btn btn-success btn-lg m-1'
          >
            Completed
          </Link>
        ) : (
          <></>
        )}
        {path !== '/production/shipped' ? (
          <Link to='/production/shipped' className='btn btn-warning btn-lg m-1'>
            Shipped
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
