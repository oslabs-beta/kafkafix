import React from 'react';
import Partitions from './HomeScreen/TopicsDisplay/Partitions';
// Home screen renders two componenets - the left panel (Sidepane) and the right topics display (topicsDisplay)

// -- Update -- I removed the side panel component and moved Navbar and connect to be part of Homescreen

// importing TopicsDisplay
import TopicsDisplay from './HomeScreen/TopicsDisplay';

// importing Navbar
import NavBar from './HomeScreen/Sidepanel/NavBar';

// importing connect
import Connect from './HomeScreen/Sidepanel/Connect';

const HomeScreen = () => {
  return (
    <div className='homeScreen'>

      <NavBar />
      <Connect />
      {/* the table showing topics - partitions shown onClick */}
      <hr></hr>
      <TopicsDisplay />
      <Partitions />
    </div>
  );
};

export default HomeScreen;
