import React, { FC } from 'react';

import { Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

const Metrics: FC = () => {
  return (
    <>
      <Link to='/'>
        <Button>Back</Button>
      </Link>
      <div id='metrics' className='navBlock'>
        <i className='fas fa-circle-notch'></i>
        <div>Metrics</div>
        <a>Key insights into your Kafka system</a>
      </div>
    </>
  );
};

export default Metrics;
