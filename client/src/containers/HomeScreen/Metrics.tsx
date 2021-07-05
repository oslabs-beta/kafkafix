import React, { FC } from 'react';
import NavBar from './Sidepanel/NavBar';

const Metrics: FC = () => {
  return (
    <>
      <NavBar></NavBar>
      <div id='metrics' className='navBlock'>
        <i className='fas fa-circle-notch'></i>
        <div>Metrics</div>
        <a>Key insights into your Kafka system</a>
      </div>
    </>
  );
};

export default Metrics;
