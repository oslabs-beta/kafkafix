import React, { FC } from 'react';
import NavBar from './Sidepanel/NavBar';

const FailureReports: FC = () => {
  return (
    <>
      <NavBar></NavBar>
      <div id='failureReports' className='navBlock'>
        <i className='fas fa-print'></i>
        <div>Failure Report</div>
        <a>Key insights into your Kafka system</a>
      </div>
    </>
  );
};

export default FailureReports;
