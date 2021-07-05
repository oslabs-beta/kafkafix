import React, { FC } from 'react';

import { Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

const FailureReports: FC = () => {
  return (
    <>
      <Link to='/'>
        <Button>Back</Button>
      </Link>
      <div id='failureReports' className='navBlock'>
        <i className='fas fa-print'></i>
        <div>Failure Report</div>
        <a>Key insights into your Kafka system</a>
      </div>
    </>
  );
};

export default FailureReports;
