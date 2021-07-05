import React, { FC } from 'react';

// importing Connect
import Connect from './Sidepanel/Connect';

// importing Navbar
import NavBar from './Sidepanel/NavBar';

const Sidepanel: FC = (props) => {
  return (
    <div className='sidepanel'>
      {/* <h1>Sidepane</h1> */}
      <NavBar />
      <Connect />
    </div>
  );
};

export default Sidepanel;
